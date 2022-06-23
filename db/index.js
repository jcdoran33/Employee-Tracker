const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    };
    // query to find all departments
    findAllDepartments () {
        return this.connection.promise().query(`SELECT * FROM department;`)
    };
    //query to view all roles
    viewAllRoles () {
        return this.connection.promise().query(`SELECT * FROM role;`)
    }
    //query to find all employee's id, firrst anme, last name, (for use in selecting a manager form drop down list.)
    findAllEmp () {
        return this.connection.promise().query(`SELECT id, first_name, last_name FROM employee;`)
    };
    //query to insert the new employee into the employee tables
    addNewEmp (newEmp) {
        return this.connection.promise().query(`INSERT INTO employee SET ?`, newEmp)
    };


}


module.exports = new DB (connection);