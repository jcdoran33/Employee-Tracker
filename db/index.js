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
    //SQL command to add a new Department into the department table
    addNewDept (newDept) {
        return this.connection.promise().query(`INSERT INTO department SET ?`, newDept);
    };
    //SQL comman to add a new Role to the role table
    addNewRole (newRole) {
        return this.connection.promise().query(`INSERT INTO role SET ?`, newRole);
    };
    //query to create a list of all current departments to be references as choices by unquirer
    findAllDepts () {
        return this.connection.promise().query(`SELECT id, name FROM department;`);
    };
    //query to create a list of all current roles to be refrenced as choices by inquirer
    findAllRoles () {
        return this.connection.promise().query(`SELECT title FROM role;`);
    };
    //query to find all employee's id, firrst anme, last name, (for use in selecting a manager form drop down list.)
    findAllEmp () {
        return this.connection.promise().query(`SELECT id, first_name, last_name FROM employee;`);
    };
    //query to insert the new employee into the employee tables
    addNewEmp (newEmp) {
        return this.connection.promise().query(`INSERT INTO employee SET ?`, newEmp);
    };
    //query to update empoyee role - insert changes into table employee - role ID
    udpdateEmpRole (updatedEmployee) {
        return this.connection.promise().query(`UPDATE employee SET role_id = ? WHERE employee.id = ?`, (updatedEmployee.role_id ,updatedEmployee.id) )
    };

}


module.exports = new DB (connection);