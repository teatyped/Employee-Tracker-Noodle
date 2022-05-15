INSERT INTO department(name)
VALUES 
    ('Customer Service'),
    ('Engineering'),
    ('Marketing'),
    ('Finance');

INSERT INTO role(title, salary, department_id)
VALUES 
    ('Customer Service Rep', 40000, 1),
    ('Software Developer', 110000, 2),
    ('Marketer', 90000, 3),
    ('Accountant', 70000, 4),
    ('Customer Manager', 75000, 1),
    ('Developer Manager', 90000, 2),
    ('Marketing Manager', 100000, 3),
    ('Accounting Manager', 120000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id) 
VALUES  
    ('Bethany', 'Christian', 5, NULL),
    ('Chandler', 'Acevedo', 6, NULL),
    ('Bob', 'Smith', 7, NULL),
    ('Sally', 'Fields', 8, NULL),
    ('Mariella', 'Rosa', 1, 1),
    ('Lola', 'Morris', 2, 2),
    ('Shelly', 'Dixon', 3, 3),
    ('Yasir', 'Sargent', 4, 4);