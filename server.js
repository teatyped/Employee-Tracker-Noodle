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
          break;
        case "Update an employee":
          break;
        default:
          process.exit();
      }

      //VIEW ALL DEPARTMENTS
      // Make a table with a list of deparments and id's: Customer Service, Developers, Marketing, Sales

      //VIEW ALL ROLES
      // Table with: role id, job title, department name, and salary

      //VIEW ALL EMPLOYEES
      //Table with employee data: employee ids, first, last, job titles, departments, salaries, and managers that employees report to

      //ADD A DEPARTMENT
      //enter name of department; add to the database
    });
}

// function to handle each case
//-----Todo:-------
// add an employee
// add role
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

// db.query(query, function (err, res) {
//     // if there is an error, throw it
//     if (err) {
//         throw err;
//     }
//     // returns the response to the console.table function and .map will return an array of objects based on the data in the query
//     const departments = res.map(departments => {
//         return {
//             // SQL departments constructor (dep_name)
//             name: departments.dep_name,
//             value: departments.id
//         }
//     });
//     // displays the departments to the user as a table
//     console.table(res);
//     // displays to the user the available departments to add.
//     console.log('Departments Available\n');
//     // runs the promptAdd function below
//     promptAddNewRole(departments);
// });

function getDepartment() {
  const query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) {
      throw err;
    }
    const departmentInfo = res.map((department) => {
      return {
        department_name: department.name,
        department_id: department.id,
      };
    });
    return departmentInfo;
  });
}

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
    .then(function (res) {
        var depId ='';
        if (res.department === "Customer Service"){
            depId = 1;
        }
        if (res.department === "Engineering"){
            depId = 2;
        }
        if (res.department === "Marketing"){
            depId = 3;
        }
        if (res.department === "Finance"){
            depId = 4;
        }

      var query = connection.query(
        "INSERT INTO role SET ? ? ? ",
        [res.title, res.salary, res.department, 1], // not working
        function (err) {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
    });
}

function addEmployee() {
  // add another employee with: first_name, last_name, manager_id
  // show employee was added to database
}

function updateEmployee() {
  // update selected employees new role.
}
