DROP TABLE IF EXISTS inventory;

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, 
    quantity INTEGER NOT NULL
);

ALTER TABLE inventory
    ADD CONSTRAINT unique_name UNIQUE (name);

INSERT INTO inventory (name, quantity) VALUES ('Laptop', 15);
INSERT INTO inventory (name, quantity) VALUES ('Keyboard', 50);
INSERT INTO inventory (name, quantity) VALUES ('Mouse', 75);