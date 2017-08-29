DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(10, 2),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 800.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", 400.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "Sports", 30.00, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soccer Ball", "Sports", 25.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jeans", "Clothing", 50.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jacket", "Clothing", 45.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Microwave", "Appliances", 40.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blender", "Appliances", 35.00, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Desk", "Furniture", 80.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Couch", "Furniture", 300.00, 2);