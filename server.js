// requirements
//Express
const express = require("express");
//Mysql
const mysql = require("mysql2");
//Inquirer
const inquirer = require("inquirer");
//console.table
const cTable = require("console.table");

//PORT
const PORT = process.env.PORT || 3001;
//define app as express()
const app = express();

//Express - middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//make db const connection to database
const db = mysql.createConnection(
    {
        host: "127.0.0.1",
        user: "root",
        password: "password",
        database: "employees_db" //need to come back and change this once db is created
    },
    console.log("Connected to the database")
    );


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
        .then((response) => {
            if (response.selectTask === "View All Departments") {
                //some code here that runs a query that shows the desired table - probably db.query
                //then relaunch the prompt from start - launchInquirer();
                launchInquirer();
            } else if (response.selectTask === "View All Roles") {
                //some code here that queries for viewing roles
                //then relaunch the prompt from start - launchInquirer();
                launchInquirer();
            } else if (response.selectTask === "View All Employees") {
                //some code here that queries for All EMployees
                //then relaunch the prompt from start - launchInquirer();
                launchInquirer();
            } else if (response.selectTask === "Add a Department") {
                //another inquirer prompt question asking for the name of department, then add that dept to the table
                //then relaunch the prompt from start - launchInquirer(); - **unless handled in external inq prompt below
            } else if (response.selectTask === "Add a Role") {
                //launch another inquirer function that asks for the name, salary, and department for the role and that role is added to the database
                //then relaunch the prompt from start - launchInquirer(); - **unless handled in external inq prompt below
            } else if (response.selectTask === "Add an Employee") {
                //launch a different inquirer function that asks for the employee’s first name, last name, role, and manager, and that employee is added to the database
                //then relaunch the prompt from start - launchInquirer(); - **unless handled in external inq prompt below
            } else if (response.selectTask === "Update an Employee Role") {
                //launch a inquirer function that prompts us to select an employee to update, then asks for their new role (another selection list), then updates the database
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
function inqAddDept () {
    inquirer
        prompt([
            {
                type: "input",
                message: "Please enter the name of the department you would like to add",
                name: "deptName"
            }
        ])
        .then((response) => {
            //sql function that adds a new row to the "department" table - use ? format for vars
            console.log(`Success! Your new department ${response.deptName} has been added to the departments table.`);
        })
        .then(() => launchInquirer());
        //relaunch launchInquirer();
};

//define inquirer prompt for Add a Role
function inqAddRole () {
    inquirer
        prompt([
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
                choices: ["Sales", "Finance", "Marketing", "Engineering", "Legal"] // need to fill in this array with role choices
            }
        ])
        .then((response) => {
            //sql function(s) that will add all the info to the "role" table, use ? for vars
        })
        .then(() => launchInquirer());
        //relaunch launchInquirer();
};

//define inquirer prompt for Add an Employee
function inqAddEmployee () {
    inquirer
        prompt ([
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
                message: "What is the new employee's role?",
                name: "empRole",
                choices: ["Account Manager", "General Counsel", "Salesperson", "Accountant", "Marketing Lead", "CFO", "Outside Sales"]
            },
            {
                type: "list",
                message: "Who will be the new employee's manager?",
                name: "empManager",
                choices: ["Manager A", "Manager B"] // this should be a variable defined glbally, that houses all the employee names that are in the db, so we can select one
            }
        ])
        .then((response) => {
            //sql function that adds new row to employee table with appropriate info, using ? format
            // add new employee to array that houses all employees
        })
        .then(() => launchInquirer());
        //relaunch launchInquirer();
};

//define inquirer prompt for Update an Employee Role
function inqUpdateEmployeeRole () {
    
    //relaunch launchInquirer();
};

//upon app launching, create an array that is populated with all employee anmes from the employee table

//app.listen
app.listen(PORT, () => console.log("The server is up and running!"));