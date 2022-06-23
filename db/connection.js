const mysql = require('mysql2')

const connection = mysql.createConnection(
    {
        host: "127.0.0.1",
        user: "root",
        password: "password",
        database: "employees_db" //need to come back and change this once db is created
    },
    console.log("Connected to the database")
);

connection.connect(function(err) {
    if (err) throw err;
})

module.exports = connection