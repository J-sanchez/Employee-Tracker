const connection = require("../config/connection");

class Employee {
    constructor(first_name, last_name, roles_id, manager_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.roles_id = roles_id;
        this.manager_id = manager_id;
    }
        readEmployees = () => {
            console.log('Viewing all Employees...\n');
            connection.query(`SELECT employee.*, roles.title, department.name AS
            department, CONCAT(manager.first_name, manager.last_name) AS manager
            FROM employee
            LEFT JOIN 
            roles ON employee.roles_id = roles.id
            RIGHT JOIN
            department ON roles.department_id = department.id
            LEFT JOIN
            manager ON employee.manager_id = manager.id`,
            function(err, res) {
                if (err) throw err;
                console.log(res);
            });
        };
}
  
module.exports = Employee;