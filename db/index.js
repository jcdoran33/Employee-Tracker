const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    };
    // query to find all departments
    viewAllDepartments () {
        return this.connection.promise().query(`SELECT * FROM department;`);
    };
    //query to view all roles
    viewAllRoles () {
        return this.connection.promise().query(`SELECT * FROM role;`);
    };
    //query to view all employees - double left join - employee id, first name, lst name, job title, department, salary, manager
    viewAllEmployees () {
        return this.connection.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee AS test ON employee.manager_id = employee.id`);
    };
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