const connection = require("./connection");

class Data {
  constructor(connection) {
    this.connection = connection;
  }

  findDepartments() {
    return this.connection
      .promise()
      .query("SELECT * FROM department ORDER BY id;");
  }

  findRoles() {
    // Table with: role id, job title, department name, and salary
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, department.name as department_name, role.salary FROM role left join department on role.department_id = department.id;"
      );
  }

  findEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department_name, CONCAT(e.first_name, ' ' ,e.last_name) AS reporting_manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id ORDER BY id;"
      );
  }

  // return a arry of roles to show in prompt
  
}

module.exports = new Data(connection);
