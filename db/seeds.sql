INSERT INTO department (name)
VALUES
    ("Sales"),
    ("Finance"),
    ("Marketing"),
    ("Engineering"),
    ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Account Manager", 50000, 1),
    ("General Counsel", 100000, 5),
    ("Salesperson", 70000, 1),
    ("Accountant", 75000, 2),
    ("Marketing Lead", 65000, 3),
    ("CFO", 200000, 2),
    ("Outside Sales", 60000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  
    ("Jack", "Doran", 6, null),
    ("Bill", "Gates", 2, 1),
    ("Steve", "Jobs", 5, 2),
    ("Lady", "Gaga", 3, 1),
    ("Kathy", "Bates", 1, 1),
    ("Harry", "Potter", 3, 2),
    ("Albus", "Dumbledore", 7, 6);