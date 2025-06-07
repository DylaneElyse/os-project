-- Drop the table if it exists to ensure a clean slate on recreation
DROP TABLE IF EXISTS inventory;

-- Create the inventory table with the corrected column name
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, -- <-- CHANGED from item_name to name
    quantity INTEGER NOT NULL
);

-- Insert some sample data
INSERT INTO inventory (name, quantity) VALUES ('Laptop', 15);
INSERT INTO inventory (name, quantity) VALUES ('Keyboard', 50);
INSERT INTO inventory (name, quantity) VALUES ('Mouse', 75);