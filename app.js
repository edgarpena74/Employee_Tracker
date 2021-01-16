const inquirer = require("inquirer");
const Choices = require("inquirer/lib/objects/choices");
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
    console.log("connection has been established")
    mainMenu()
});

const tableDep = () => {
    connection.query(
        `SELECT * FROM department`, (err, data) => {
            if(err) throw err;
            console.table(data)
        }
    )
};

const tableRole = () => {
    connection.query(
        `SELECT * FROM role`, (err, data) => {
            if(err) throw err;
            console.table(data)
        }
    )
};

const tableEmp = () => {
    connection.query(
        `SELECT * FROM employee`, (err, data) => {
            if(err) throw err;
            console.table(data)
        }
    )
};

const tables = () => {
    tableDep();
    tableRole();
    tableEmp();    
}
const addRole = () => {

    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the role?"
            },
            {
                name: "salary",
                type: "input",
                message: "what the the salary for this role?",
            },
            {
                name: "depID",
                type: "input",
                message: "What is this the department id?"

            }
        ])
        .then((input) => {
            
           const sql = `INSERT INTO role (title, salary, department_id) 
                        VALUE ("${input.title}", ${input.salary}, ${input.depID})`
           connection.query(sql, (err) => {
               if(err) throw err;
               tableRole();
           })
        })
}

const addDep = () => {
    inquirer
        .prompt({
            name: "depName",
            type: "input",
            message: "What is the departments name?"
        })
        .then((input) => {
            
           const sql = `INSERT INTO department (name) VALUE ("${input.depName}")`
           connection.query(sql, (err) => {
               if(err) throw err;
               tableDep();
           })
        })
}

const add = () => {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Which would you like to add?",
            choices: [
                "Department",
                "Role",
                "Employee"
            ]
        })
        .then((userResponse) => {
            switch (userResponse.action) {
                case "Department":
                    console.log("departments")
                    addDep();
                    break;
                case "Role":
                    console.log("roles")
                    addRole()
                    break;
                case "Employee":
                    console.log("Employees")
                    break;
                default:
                    connection.end();
                    process.exit(0);
                    break;
            }
        })
};  


const mainMenu = () => {
    
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Hello what would you like to do",
            choices: [
                "Add departments, roles, employees",
                "View department, roles, employees",
                "Update employee roles",
                "delete id",
                "Exit"
            ]

        })
        .then((userResponse) => {
            switch (userResponse.action) {
                case "Add departments, roles, employees":
                    add()
                    break;
                case "View department, roles, employees":
                    tables();
                    break;
                case "Update employee roles":
                    console.log(update)
                    break;
                case "delete id":
                    console.log("delete")
                    break;
            
                default:
                    connection.end();
                    process.exit(0);
                    break;
            }
        })
}