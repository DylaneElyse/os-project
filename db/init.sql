-- Create the inventory table
CREATE TABLE inventory (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL
);

-- (Optional) Insert some sample data to start with
INSERT INTO inventory (name, quantity) VALUES ('Laptop', 15);
INSERT INTO inventory (name, quantity) VALUES ('Keyboard', 50);
INSERT INTO inventory (name, quantity) VALUES ('Mouse', 75);