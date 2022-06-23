const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    };

    findAllDepartments () {
        return this.connection.promise().query(`SELECT * FROM department;`)
    };

    findAllEmp () {
        return this.connection.promise().query(`SELECT id, first_name, last_name FROM employee`)
    };

    addNewEmp (newEmp) {
        return this.connection.promise().query(`INSERT INTO employee SET ?`, newEmp)
    };
}


module.exports = new DB (connection);