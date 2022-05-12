use employees;


INSERT INTO departments(name)
VALUES
    ('HR'),
    ('Sales'),
    ('Engineering'),
    ('Finances'),
    ('Production');

INSERT INTO roles(title, salary, department_id)
VALUES
    ('HR Manager', 150000, 1),
    ('Representative', 50000, 1),
    ('Sales Manager', 150000, 2),
    ('Representative', 50000, 2),
    ('Engineer Manager', 150000, 3),
    ('Engineer', 80000, 3),
    ('Intern', 30000, 3),
    ('Finances Manager', 150000, 4),
    ('Accountant', 70000, 4),
    ('Production Manager', 150000, 5), 
    ('Factory Worker', 45000, 5),
    ('Representative', 50000, 5);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
    ('Anitta', 'Gonzalez', 1, NULL),
    ('Geronimo', 'Perez', 3, 1),
    ('John', 'Smith', 4, 2),
    ('John', 'Joe', 1, 3),
    ('Christian', 'Gomez', 1, 4);