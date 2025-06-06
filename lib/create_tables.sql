CREATE TABLE IF NOT EXISTS inventory (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL
)

INSERT INTO inventory (item_name, quantity) VALUES
('Widget A', 100),
('Widget B', 200),
('Widget C', 150);

SELECT * FROM inventory;