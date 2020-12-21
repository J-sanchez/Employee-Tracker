class Department {
    constructor(name) {
        this.name = name;
    }

    viewDepartment = () => {
        console.log('viewing by Department');
        const query = connection.query(
            `SELECT employee.*, roles.department_id 
            AS department_id 
            FROM employee 
            LEFT JOIN roles 
            ON employee.roles_id = roles.id`)
    }
}

module.exports = Department;