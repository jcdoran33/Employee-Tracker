// requirements
//Express
//Mysql
const mysql = require("mysql2");
//Inquirer
const inquirer = require("inquirer");
//console.table
const cTable = require("console.table");

const db = require("./db");

// //PORT
// const PORT = process.env.PORT || 3001;
// //define app as express()
// const app = express();

// //Express - middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

//make db const connection to database



//create explicit call to connect to db here
// db.connect();

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
                //some code here that runs a query that shows the desired table - probably db.query
                db.findAllDepartments()
                .then(([viewDepts]) => {
                    // console.log(viewDepts, typeof viewDepts);
                    console.table(viewDepts);
                    //then relaunch the prompt from start - launchInquirer();
                    launchInquirer();
                })

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
            console.log(`Success! Your new department ${response.deptName} has been added to the departments table.`);
        })
        .then(() => launchInquirer());
    //relaunch launchInquirer();
};

//define inquirer prompt for Add a Role
function inqAddRole() {
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
                choices: ["Sales", "Finance", "Marketing", "Engineering", "Legal"] // need to fill in this array with role choices
            }
        ])
        .then((response) => {
            //sql function(s) that will add all the info to the "role" table, use ? for vars
            console.log(`Success! Your new role ${response.roleName} has been added to the roles table, with a salary of ${response.roleSalary}.`);
        })
        .then(() => launchInquirer());
    //relaunch launchInquirer();
};

//define inquirer prompt for Add an Employee
function inqAddEmployee() {
    //HERE is where we should create a variable that is equal to all current employees that are managers (or, really, just all current employee names would be better. There is no designation for manager t/f anywhere)
    // db.query(`SELECT CONCAT(first_name, ' ' ,last_name) as full_name FROM employee`, function (err, results) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log(results);
    //     console.log(typeof results);
    //     // return results.json()

    // })
    //commented out above to try asyn /promise version below
    db.findAllEmp()
        .then(([results]) => {
            const managerOptions = results.map(({id, first_name, last_name}) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }))
            
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
                        message: "What is the new employee's role?",
                        name: "empRole",
                        choices: ["Account Manager", "General Counsel", "Salesperson", "Accountant", "Marketing Lead", "CFO", "Outside Sales"]
                    },
                    {
                        type: "list",
                        message: "Who will be the new employee's manager?",
                        name: "empManager",
                        choices: managerOptions // this should be a variable array, that houses all the employee names that are in the db, so we can select one
                    }
                ])
        //closing parentheses for the new .then in line 153
        .then((response) => {

            let newEmp = {
                first_name: response.empFirstName, 
                last_name: response.empLastName,
                //role: response.empRole, // change to ID instead of role name
                manager_id: response.empManager
            }
            db.addNewEmp(newEmp);

            //insert sql function that adds new row to employee table with appropriate info, using ? format
            // add new employee to array that houses all employees??
            
        })
        .then(() => launchInquirer())
        .catch((err) => {
            console.log("ERROR MESSAGE: ", err);
        });
    //relaunch launchInquirer();
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

// //app.listen
// app.listen(PORT, () => console.log("The server is up and running!"));