const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"abc123",
    database: "empTrackerDB"
});

connection.connect((err) => {
    if(err) throw err;
    console.log("we have connected")
})