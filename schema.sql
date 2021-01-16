-- add a thing for managers


DROP DATABASE IF EXISTS empTrackerDB;

CREATE DATABASE empTrackerDB;

use empTrackerDB;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    department_id INT NOT NULL,
    FOREIGN KEY(department_id) REFERENCES department(id),
    PRIMARY KEY(id)
  
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL, 
    manager_id INT NOT NULL,
    FOREIGN KEY(role_id) REFERENCES role(id),
    PRIMARY KEY(id)
    
);


