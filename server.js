const db = require("./db");
const connection = require("./db/connection");
const inquirer = require("inquirer");

init();

function init() {
  inquirer
    .prompt([
      //start questions
      {
        type: "list",
        name: "options",
        message: "Which would you like to view?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee",
          "Done",
        ],
      },
    ])
    .then(function (startAnswer) {
      switch (startAnswer.options) {
        case "View all departments":
          //run the view departments function
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
            addEmployee();
          break;
        case "Update an employee":
            updateEmployee();
          break;
        default:
          process.exit();
      }
    });
}

// function to handle each case
//-----Todo:-------
// add an employee
// update employee role

function viewAllDepartments() {
  db.findDepartments()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => init());
}

function viewAllRoles() {
  db.findRoles()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => init());
}

function viewAllEmployees() {
  db.findEmployees()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => init());
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What Department would you like to add?",
        validate: (departInput) => {
          if (departInput) {
            return true;
          } else {
            console.log("Please provide a department name");
            return false;
          }
        },
      },
    ])
    .then(function (res) {
      var query = connection.query(
        "INSERT INTO department SET ? ",
        {
          name: res.name,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          console.log(`Success! ${res.name} added!`);
          init();
        }
      );
    });
}

// added new role into role table and output new table to user
function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter a role",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter salary amount for the role",
        },
        {
          type: "list",
          name: "department",
          message: "Select which Department the role is in",
          choices: ["Customer Service", "Engineering", "Marketing", "Finance"],
        },
      ])
      .then((answer) => {
        connection.query('SELECT id FROM department WHERE ? ', {name: answer.department}, (err, idRes) =>{
            if (err) throw err;
            const [{id}] = idRes
            connection.query('INSERT INTO role SET ?', {
                title: answer.title,
                salary: answer.salary,
                department_id: id,
            })
            console.table(answer);
            console.log('You added a role successfully');
            init();
        })
    })
  }

//support functions for add employee
var roleArr = [];
function selectRole() {
    connection.query("SELECT * FROM role", function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        roleArr.push(res[i].title);
      }
    });
    return roleArr;
  }

  var managersArr = [];
 function selectManager() {
    connection.query(
      "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
      function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          managersArr.push(res[i].first_name);
        }
      }
    );
    return managersArr;
  }

  // add another employee with: first_name, last_name, manager_id
  // show employee was added to database
function addEmployee() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "Please enter employee's first name",
        },
        {
          type: 'input',
          name: 'lastName',
          message: "Please enter employee's last name",
        },
        {
          type: 'list',
          name: 'role',
          message: 'What is their role?',
          choices: selectRole()
        },
        {
          type: 'list',
          name: 'manager',
          message: 'Who is the manager',
          choices: selectManager()
        },
      ])
      .then(function (res) {
        var roleId = selectRole().indexOf(res.role) + 1
        var managerId = selectManager().indexOf(res.choice) + 1
        console.log(managerId);
        var query = connection.query(
          'INSERT INTO employee SET ? ',
          {
            first_name: res.firstName,
            last_name: res.lastName,
            role_id: roleId,
            manager_id: managerId,
          },
          function (err) {
            if (err) throw err;
            console.table(res);
            init();
          }
        );
      });
  }

function updateEmployee() {
  // update selected employees new role.
}
