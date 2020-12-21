class roles {
    constructor(title, salary, department_id) {
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }

    updateroles = () => {
        console.log('updating roles');
        const query = connection.query(`UPDATE employee SET roles_id = ? 
        WHERE id = ?`, [], 
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + ' roles updated!!\n')
        }
    );
    console.log(query.sql);
    };
    
}

module.exports = roles