// requirements
//Mysql
const mysql = require("mysql2");
//Inquirer
const inquirer = require("inquirer");
//console.table
const cTable = require("console.table");

const db = require("./db");
const { addNewRole } = require("./db");

//inquirer launch here (wrap it in a function?)
function launchInquirer() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "selectTask",
                choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"]
            }
        ])
        //think about converting the below IF conditions to a switch statement
        .then(async (response) => {
            if (response.selectTask === "View All Departments") {
                //launch module function that will trigger query, and relaunch main prompt after
                modViewAllDepts();

            } else if (response.selectTask === "View All Roles") {
                //launch module function that will trigger query, and relaunch main prompt after
                modViewAllRoles();

            } else if (response.selectTask === "View All Employees") {
                //launch module function that will trigger query, and relaunch main prompt after
                modViewAllEmployees();

            } else if (response.selectTask === "Add a Department") {
                //another inquirer prompt question asking for the name of department, then add that dept to the table
                inqAddDept();
                //then relaunch the prompt from start - launchInquirer(); - **unless handled in external inq prompt below
            } else if (response.selectTask === "Add a Role") {
                //launch another inquirer function that asks for the name, salary, and department for the role and that role is added to the database
                inqAddRole();
                //then relaunch the prompt from start - launchInquirer(); - **unless handled in external inq prompt below
            } else if (response.selectTask === "Add an Employee") {
                //launch a different inquirer function that asks for the employee’s first name, last name, role, and manager, and that employee is added to the database
                inqAddEmployee();
                //then relaunch the prompt from start - launchInquirer(); - **unless handled in external inq prompt below
            } else if (response.selectTask === "Update an Employee Role") {
                //launch a inquirer function that prompts us to select an employee to update, then asks for their new role (another selection list), then updates the database
                inqUpdateEmployeeRole();
                //then relaunch the prompt from start - launchInquirer(); - **unless handled in external inq prompt below
            } else {
                console.log("Error (launchInquirer func): There was an issue with your selection, please select which task you would like to do again.");
                launchInquirer();
            };
        });
};

//==========================================
// define additional inquirer functions here
//define inquirer prompt for Add a Department
function inqAddDept() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter the name of the department you would like to add",
                name: "deptName"
            }
        ])
        .then((response) => {
            //sql function that adds a new row to the "department" table - use ? format for vars
            let newDept = {
                name: response.deptName
            };
            console.log(`++++++++++Success! Your new department ${response.deptName} has been added to the departments table.++++++++++`);

        })
        .then(() => launchInquirer()) //relaunch launchInquirer();
        .catch((err) => {
            console.log("ERROR MESSAGE: ", err);
        });
};

//define inquirer prompt for Add a Role
function inqAddRole() {

    db.findAllDepts()
        .then(([results]) => {
            const deptOptions = results.map(({ name }) => ({
                name: name
                //do we need value: id here to make it work? (and go add ID to query AND add to destructuring above)
            }))
            // console.log("DEPT NAME TEST: ", deptOptions);

            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "Enter the name of the new role",
                        name: "roleName"
                    },
                    {
                        type: "input",
                        message: "Enter the salary for this new role",
                        name: "roleSalary"
                    },
                    {
                        type: "list",
                        message: "Enter the department this role will fall under",
                        name: "roleDept",
                        // choices: ["Sales", "Finance", "Marketing", "Engineering", "Legal"] // need to fill in this array with dept choices
                        choices: deptOptions // OR should this just be apt ID's? WIth hardcoded key 1=Sales, 2=Finance, etc OR show a table right before so ID/dept associations ar clear
                    }
                ])
                .then((response) => {
                    //sql function(s) that will add all the info to the "role" table, use ? for vars
                    let newRole = {
                        title: response.roleName,
                        salary: response.roleSalary,
                        department_id: response.roleDept //need to either swith this result and the inquirer prompt to choose from an ID number, or change something....
                    };
                    //call SQL INSERT function addNewRole() here
                    // db.addNewRole(newRole);
                    console.log(`Success! Your new role ${response.roleName} has been added to the roles table, with a salary of ${response.roleSalary}.`);
                })
                .then(() => launchInquirer()) //relaunch launchInquirer();
                .catch((err) => {
                    console.log("ERROR MESSAGE: ", err);
                });
        })
};

//define inquirer prompt for Add an Employee
function inqAddEmployee() {

    db.findAllEmp()
        .then(([results]) => {
            const managerOptions = results.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }))
            console.log("MANAGER NAME TEST: ", managerOptions);
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is the new employee's first name?",
                        name: "empFirstName"
                    },
                    {
                        type: "input",
                        message: "What is the new employee's last name?",
                        name: "empLastName"
                    },
                    {
                        type: "list",
                        message: "What is the new employee's role?", //for ID, include here a layout in the string, so "What is the new employee's role? (1- Account Manager, 2- General COunsel, etc)"
                        name: "empRole",
                        choices: ["Account Manager", "General Counsel", "Salesperson", "Accountant", "Marketing Lead", "CFO", "Outside Sales"] // !should be ID not a slection of role. need to replace this with a variable of current roles? or just role IDS?????
                    },
                    {
                        type: "list",
                        message: "Who will be the new employee's manager?",
                        name: "empManager",
                        choices: managerOptions // this should be a variable array, that houses all the employee names that are in the db, so we can select one - SHOULD THIS BE IDs and not a name selections?
                    }
                ])

                .then((response) => {

                    let newEmp = {
                        first_name: response.empFirstName,
                        last_name: response.empLastName,
                        //role: response.empRole, // change to ID instead of role name - may have to create a large IF condition or switch case to handle this?????
                        manager_id: response.empManager
                    }
                    db.addNewEmp(newEmp);
                })
                .then(() => launchInquirer())
                .catch((err) => {
                    console.log("ERROR MESSAGE: ", err);
                });
        })
};

//define inquirer prompt for Update an Employee Role
function inqUpdateEmployeeRole() {
    //HERE is where we create variable that is an array of all current employees (so it will redefine the variable each time it is called upon)
    inquirer
        .prompt([
            {
                type: "list",
                message: "Select an employee to change their role",
                name: "empNewRoleSelect",
                choices: ["Example"] // need to replace this with a variable that represents all current employees
            },
            {
                type: "list",
                message: "Select the employee's new role",
                name: "empNewRoleRole",
                choices: ["Account Manager", "General Counsel", "Salesperson", "Accountant", "Marketing Lead", "CFO", "Outside Sales"]
            }
        ])
        .then((response) => {
            //sql function that edits the chosen employee's row with new role
        })
        .then(() => launchInquirer());
    //relaunch launchInquirer();
};


//launch launchInquirer immediately
launchInquirer();

//==============================================================
//MODULARIZATION of functions in the main inquirer prompt below
//==============================================================

// module for View All Departments function
function modViewAllDepts() {
    db.viewAllDepartments()
        .then(([viewDepts]) => {
            // console.log(viewDepts, typeof viewDepts);
            console.table(viewDepts);
            //then relaunch the prompt from start - launchInquirer();
            launchInquirer();
        });
};

//module for View All Roles function
function modViewAllRoles() {
    db.viewAllRoles()
        .then(([allRoles]) => {
            console.table(allRoles);
            //then relaunch the prompt from start - launchInquirer();
            launchInquirer();
        });
};

//module for View All Employees function
function modViewAllEmployees() {
    db.viewAllEmployees()
        .then(([allEmployees]) => {
            console.table(allEmployees);
            //then relaunch the prompt from start - launchInquirer();
            launchInquirer();
        });
};
//module for Add a Department

//module for Add a Role

//module for Add an Employee

//Module for Update an Employee
