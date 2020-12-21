const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Employee = require('./lib/Employees');
const roles = require('./lib/roles');
const Department = require('./lib/Department');
const connection = require('./config/connection');

const employeeData = [];


console.log(
        `
        ********************************************************
        ********************************************************
                WELCOME TO EMPLOYEE TRACKER
        ********************************************************
        ********************************************************
        `
)
const promptQuestions = () => {
    
    return inquirer.prompt([
        {
            type: 'list',
            name: 'viewAll',
            message: 'Select an option',
            choices:
                ['View ALL Employees',
                    'View Departments',
                    'View roles',
                    'View by Manager',
                    'Add Employee',
                    'Add Department',
                    'Add roles',
                    'Update roles',
                ]
        }
    ])
        .then(choice => {
            if (choice.viewAll === 'View ALL Employees') {
                readEmployees();
            } 
            else if (choice.viewAll === 'View Departments') {
                viewDepartment();
            } 
            else if (choice.viewAll === 'View by Manager') {
                viewManager();
            }
            else if (choice.viewAll === 'View roles') {
                viewroles();
            }
            else if (choice.viewAll === 'Add Department') {
                addDepartment();
            }
            else if (choice.viewAll === 'Add roles') {
                addroles();
            }
            else if (choice.viewAll === 'Add Employee') {
                addEmployee();
            }
            else if (choice.viewAll === 'Update roles') {
                updateroles();
            }
        })

    function readEmployees() {
        console.log('Viewing all Employees');
        //connection.query(`SELECT * FROM employee`,
        connection.query(`
            SELECT 
            employee.id AS ID,
            employee.first_name AS FirstName,
            employee.last_name AS LastName,
            employee.manager AS Manager,
            roles.title AS Title, 
            roles.salary AS $alary,
            department.name AS Department
            FROM employee
            LEFT JOIN roles ON employee.roles_id = roles.id
            LEFT JOIN department ON roles.department_id = department.id
            `,
            function (err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.table(res);
                promptQuestions();
            });
    };

    function viewDepartment() {
        console.log('viewing by Department');
        connection.query(
            `SELECT id, name
                FROM department`,
            function (err, res) {
                if (err) throw err;
                console.table(res);
                promptQuestions();
            });
    };

    function viewManager() {
        console.log('viewing managers');
        connection.query(
            `SELECT first_name, last_name, manager
                FROM employee`,
            function (err, res) {
                if (err) throw err;
                console.table(res);
                promptQuestions();
            });
    };

    function viewroles() {
        console.log('Viewing all roles');
        connection.query(
            `SELECT 
                roles.id AS ID,
                roles.title AS title,
                roles.salary AS $ALARY,
                department.name AS department
                FROM roles
                LEFT JOIN department ON roles.department_id = department.id`,
            function (err, res) {
                if (err) throw err;
                console.table(res);
                promptQuestions();
            });
    };

    function addDepartment() {
        return inquirer.prompt([

            {
                type: 'input',
                name: 'departmentname',
                message: 'Provide a new DEPARTMENT',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please enter a Department name!');
                        return false;
                    }
                }
            },
        ])
            .then(storeDept => {
                const newDept = storeDept.departmentname

                console.log('updating Department');
                const sql = `INSERT INTO department (name) VALUES (?)`;
                const params = [newDept];
                connection.query(sql, params, function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`================
                        SUCCESSFULLY added Department
                        =============================`);
                });
                promptQuestions();
            })
    };

    function addroles() {
        connection.promise().query(`
        SELECT department.name, department.id FROM department
        `)
        .then(([rows])=> {
            var departments = rows.map(({name, id}) => ({
                name: name,
                value: id
                
            }));
        
            console.log(rows)
            return inquirer.prompt([

                {
                    type: 'input',
                    name: 'rolestitle',
                    message: 'Provide a new roles TITLE',
                    validate: rolesTitleInput => {
                        if (rolesTitleInput) {
                            return true;
                        } else {
                            console.log('Please enter a roles TITLE!');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'rolesalary',
                    message: 'Provide a new roles SALARY',
                    validate: rolesalaryInput => {
                        if (rolesalaryInput) {
                            return true;
                        } else {
                            console.log('Please enter a roles SALARY')
                        }
                    }

                },
                {
                    type: 'list',
                    name: 'rolesdept',
                    message: 'Provide select a DEPARTMENT',
                    choices: departments

                },
            ])
                .then(({rolestitle, rolesalary, rolesdept}) => {
                    

                    console.log('updating roles');
                    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
                    const params = [rolestitle, rolesalary, rolesdept];
                    connection.query(sql, params, function (err, res) {
                        if (err) {
                            console.log(err);
                        }
                        console.log(`================
                            SUCCESSFULLY added roles
                            =============================`);
                    });
                    promptQuestions();
                })
    
            })        
    };

    function addEmployee() {
        connection.promise().query(`
        SELECT roles.id, roles.title FROM roles
        `)
        .then(([rows])=> {
            var roles = rows.map(({id, title}) => ({
                name: title,
                value: id
                
            }));
        
            console.log(rows)
            return inquirer.prompt([

                {
                    type: 'input',
                    name: 'firstname',
                    message: 'Provide employee FIRST NAME',
                    validate: firstNameInput => {
                        if (firstNameInput) {
                            return true;
                        } else {
                            console.log('Please enter FIRST NAME!');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'lastname',
                    message: 'Provide employee LAST NAME',
                    validate: lastNameInput => {
                        if (lastNameInput) {
                            return true;
                        } else {
                            console.log('Please enter LAST NAME')
                        }
                    }

                },
                {
                    type: 'list',
                    name: 'roleselect',
                    message: 'Provide select a roles',
                    choices: roles

                },
            ])
                .then(({firstname, lastname, roleselect}) => {
                    

                    console.log('updating employee');
                    const sql = `INSERT INTO employee (first_name, last_name, roles_id) VALUES (?, ?, ?)`;
                    const params = [firstname, lastname, roleselect];
                    connection.query(sql, params, function (err, res) {
                        if (err) {
                            console.log(err);
                        }
                        console.log(`=================================
                                        SUCCESSFULLY added EMPLOYEE
                                    ==================================
                            `);
                    });
                    promptQuestions();
                })
    
            })
    };

    function updateroles() {
        connection.promise().query(`
        SELECT employee.last_name, employee.id, roles.id, roles.title 
        FROM employee
        LEFT JOIN roles ON employee.roles_id = roles.id
        `)
        .then(([rows])=> {
            var employees = rows.map(({ last_name, id }) => ({
                name: last_name,
                value: id   
            }))
            var roles = rows.map(({ id, title }) => ({
                name: title,
                value: id
            })
            );
        
            console.log(rows)
            return inquirer.prompt([

                {
                    type: 'list',
                    name: 'employeelist',
                    message: 'Select an Employee',
                    choices: employees
                },
                {
                    type: 'list',
                    name: 'roleslist',
                    message: 'Select a roles',
                    choices: roles
                }
            ])
            .then(({employeelist, roleslist}) => {
                

                console.log('updating roles');
                const sql = `UPDATE employee SET roles_id = ? WHERE id = ?`;
                const params = [employeelist, roleslist];
                connection.query(sql, params, function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`=================================
                                    SUCCESSFULLY updated roles
                                ==================================
                        `);
                });
                promptQuestions();
            })

        })
    };
}

promptQuestions();