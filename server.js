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
        database: "name_here"
    },
    console.log("Connected to the database")
    )


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
        .then((response) => {
            
        })


};

//app.get(s) here?

//app.listen
app.listen(PORT, () => console.log("The server is up and running!"));