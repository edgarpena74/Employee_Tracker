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
};

const addDep = () => {
    inquirer
    .prompt({
        name: "dep",
        type: "input",
        message: "What is the department name?"
    })
    .then((input) => {
        const sql = `INSERT INTO department (name) 
                        VALUE ("${input.dep}")`
           connection.query(sql, (err) => {
               if(err) throw err;
               tableDep();
           })
      
    })
};

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
};

const addEmp = () => {
    inquirer
    .prompt([
        {
            name: "first",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "last",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type: "input",
            message: "What is the employee's role?"
        },
        {
            name: "manager",
            type: "input",
            message: "Who is the manager?"
        }
    ])
    .then((input) => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                        VALUE ("${input.first}", "${input.last}", ${input.role}, ${input.manager})`
           connection.query(sql, (err) => {
               if(err) throw err;
               tableRole();
           })
      
    })
};

const add = () => {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Choose which to add",
            choices: [
                "Department",
                "Role",
                "Employee",
                "Exit"
            ]
        })
        .then((userResponse) => {
            switch (userResponse.action) {
                case "Department":
                    addDep();
                    break;
                case "Role":
                    addRole();
                    break;
                case "Employee":
                    addEmp();
                    break;
                default:
                    connection.end();
                    process.exit(0);
                    break;
            }
        })
};  

const delDep = () => {
    inquirer
        .prompt({
            name: "del",
            type: "input",
            message: "Choose an id to delete"
        })
        .then((input) => {
            const sql = `DELETE FROM department WHERE id = ${input.del} `
            connection.query(sql, (err) => {
                if(err) throw err;
                tableDep();
            })
        })
};


const delRole = () => {
    inquirer
        .prompt({
            name: "del",
            type: "input",
            message: "Choose an id to delete"
        })
        .then((input) => {
            const sql = `DELETE FROM role WHERE id = ${input.del} `
            connection.query(sql, (err) => {
                if(err) throw err;
                tableRole();
                
            })
        })
};


const delEmp = () => {
    inquirer
        .prompt({
            name: "del",
            type: "input",
            message: "Choose an id to delete"
        })
        .then((input) => {
            const sql = `DELETE FROM employee WHERE id = ${input.del} `
            connection.query(sql, (err) => {
                if(err) throw err;
                tableEmp();
            })
        })
};

const del = () => {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Choose which to Delete",
            choices: [
                "Department",
                "Role",
                "Employee",
                "Exit"
            ]
        })
        .then((userResponse) => {
            switch (userResponse.action) {
                case "Department":
                    delDep();
                    break;
                case "Role":
                    delRole();
                    break;
                case "Employee":
                    delEmp();
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
                    del();
                    break;
            
                default:
                    connection.end();
                    process.exit(0);
                    break;
            }
        })
}