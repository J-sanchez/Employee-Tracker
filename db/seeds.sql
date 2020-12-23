INSERT INTO department (department_name , id)
VALUES 
    ('Engineering' , 1),
    ('Finance' , 2),
    ('Legal' , 3),
    ('Sales' , 4);

INSERT INTO roles(title, salary, department_id)
VALUES
('Manager', 100000, 1),
('Sales Rep', 67000, 2),
('HR Rep', 72000, 4),
('Warehouse Worker', 45000, 3),
('Receptionist', 47000, 6),
('Accountant', 89000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager)
VALUES 
('Michael', 'Scott', 1),
('Pam', 'Beesly', 4),
('Jim', 'Halpert', 2),
('Toby', 'Flenderson', 3),
('Stanley', 'Hudson', 6),
('Darryl', 'Philbin', 3);

UPDATE `employee_db`.`employees` SET `manager_id` = '1' WHERE (`id` > '1');