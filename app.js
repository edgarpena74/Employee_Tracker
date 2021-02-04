const inquirer = require("inquirer");
const Choices = require("inquirer/lib/objects/choices");

const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "abc123",
  database: "empTrackerDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connection has been established");
  mainMenu();
});

const tableDep = () => {
  connection.query(`SELECT * FROM department`, (err, data) => {
    if (err) throw err;
    console.table(data);
  });
};

const tableRole = () => {
  connection.query(`SELECT * FROM role`, (err, data) => {
    if (err) throw err;
    console.table(data);
  });
};

const tableEmp = () => {
  connection.query(`SELECT * FROM employee`, (err, data) => {
    if (err) throw err;
    console.table(data);
  });
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
      message: "What is the department name?",
    })
    .then((input) => {
      const sql = `INSERT INTO department (name) 
                        VALUE ("${input.dep}")`;
      connection.query(sql, (err) => {
        if (err) throw err;
        tableDep();
      });
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the role?",
      },
      {
        name: "salary",
        type: "input",
        message: "what the the salary for this role?",
      },
      {
        name: "depID",
        type: "input",
        message: "What is this the department id?",
      },
    ])
    .then((input) => {
      const sql = `INSERT INTO role (title, salary, department_id) 
                        VALUE ("${input.title}", ${input.salary}, ${input.depID})`;
      connection.query(sql, (err) => {
        if (err) throw err;
        tableRole();
      });
    });
};

const addEmp = () => {
  connection
    .promise()
    .query("SELECT * FROM role")
    .then(([rows]) => {
      // const roleArray = rows.map(role => ({name: role.title, value: role.id}))
      const roleArray = [];
      for (let i = 0; i < rows.length; i++) {
        const role = rows[i];
        roleArray.push({ name: role.title, value: role.id });
      }
      connection
        .promise()
        .query("SELECT * FROM employee")
        .then(([rows]) => {
          const empArray = [];
          for (let i = 0; i < rows.length; i++) {
            const emp = rows[i];
            empArray.push({
              name: emp.first_name + " " + emp.last_name,
              value: emp.id,
            });
          }

          inquirer
            .prompt([
              {
                name: "first",
                type: "input",
                message: "What is the employee's first name?",
              },
              {
                name: "last",
                type: "input",
                message: "What is the employee's last name?",
              },
              {
                name: "role",
                type: "list",
                message: "What is the employee's role?",
                choices: roleArray
              },
              {
                name: "manager",
                type: "list",
                message: "Who is the manager?",
                choices: empArray
              },
            ])
            .then((input) => {
              const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                        VALUE ("${input.first}", "${input.last}", ${input.role}, ${input.manager})`;
              connection.query(sql, (err) => {
                if (err) throw err;
                tableEmp();
              });
            });
        });
    });
};

const add = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Choose which to add",
      choices: ["Department", "Role", "Employee", "Exit"],
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
    });
};

const update = () => {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Choose the id of the employee you wish to update",
      },
      {
        name: "role",
        type: "input",
        message: "Update the new role by entering the role's id number",
      },
    ])
    .then((input) => {
      const sql = `UPDATE employee SET role_id = ${input.role} where id = ${input.id}`;
      connection.query(sql, (err) => {
        if (err) throw err;
        tableEmp();
      });
    });
};

const delDep = () => {
  inquirer
    .prompt({
      name: "del",
      type: "input",
      message: "Choose an id to delete",
    })
    .then((input) => {
      const sql = `DELETE FROM department WHERE id = ${input.del} `;
      connection.query(sql, (err) => {
        if (err) throw err;
        tableDep();
      });
    });
};

const delRole = () => {
  inquirer
    .prompt({
      name: "del",
      type: "input",
      message: "Choose an id to delete",
    })
    .then((input) => {
      const sql = `DELETE FROM role WHERE id = ${input.del} `;
      connection.query(sql, (err) => {
        if (err) throw err;
        console.log("\n Updated Table for Roles");
        tableRole();
      });
    });
};

const delEmp = () => {
  inquirer
    .prompt({
      name: "del",
      type: "input",
      message: "Choose an id to delete",
    })
    .then((input) => {
      const sql = `DELETE FROM employee WHERE id = ${input.del} `;
      connection.query(sql, (err) => {
        if (err) throw err;
        tableEmp();
      });
    });
};

const del = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Choose which to Delete",
      choices: ["Department", "Role", "Employee", "Exit"],
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
    });
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
        "Update employee",
        "Delete departments, roles, employees",
        "Exit",
      ],
    })
    .then((userResponse) => {
      switch (userResponse.action) {
        case "Add departments, roles, employees":
          add();
          break;
        case "View department, roles, employees":
          tables();
          break;
        case "Update employee":
          console.log("update");
          update();
          break;
        case "Delete departments, roles, employees":
          del();
          break;

        default:
          connection.end();
          process.exit(0);
          break;
      }
    });
};
