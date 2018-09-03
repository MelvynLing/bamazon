DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
item_id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(45) NOT NULL, 
department_name VARCHAR (45) NOT NULL, 
price DECIMAL (10,2) NOT NULL, 
stock_quantity INTEGER (11) NOT NULL, 
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Cheese', 'dairy', 2.46, 990),
		('Milk', 'dairy', 4.90, 883),
		('Yogurt', 'dairy', 2.34, 865),
		('Rye bread', 'bread', 5.92, 542),
        ('Whole Wheat bread', '', 2.86, 654),
        ('Apple', 'fruit', 0.34, 999),
        ('Orange', 'fruit', 0.50, 999),
        ('kale', 'vegetable', 2.99, 999),
        ('spinach', 'vegetable', 3.00, 999),
        ('cookie', 'snacks', 0.99, 888);