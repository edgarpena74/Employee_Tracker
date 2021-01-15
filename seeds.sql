USE empTrackerDB;

INSERT INTO department (name)
VALUES ("Production"), ("Mastering");

INSERT INTO role (title, salary, department_id)
VALUES ("Artist", 100000, 1), ("Producer", 200000, 1), ("Post-Production", 200000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Foo", "Fighters", 1, 1), ("John", "Frusciante", 1, 3), ("Rick", "Rubin", 2, 2), ("Frick", "Frubin", 3, 2);
