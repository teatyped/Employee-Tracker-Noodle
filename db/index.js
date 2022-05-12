const connection = require("./connection");

class Data {
  constructor(connection) {
    this.connection = connection;
  }

  findDepartments() {
    return this.connection.promise().query("SELECT * FROM department;");
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
    // employee data: employee ids, first, last, job titles, department name, salaries, and managers full name that employees report to (look into CONCAT() mysql)
    //employee table: employee.id, employee.first_name, employee.last_name
    // role table: role.title, role.salary,
    // add managers name in query
    return this.connection
      .promise()
      .query(
        'SELECT table1.first_name, table1.last_name, table1.role_id, table2.manager_id, table2.first_name, table2.last_name, CONCAT(table2.first_name, " ", table2.last_name) AS reporting_manager FROM employees AS table1 left join employees AS table2 on table1.role_id = table2.manager_id;'
      );
  }
}

module.exports = new Data(connection);
