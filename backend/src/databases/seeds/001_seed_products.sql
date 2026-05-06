INSERT INTO products (name, description, category, price, cost_price, stock_quantity, is_active)
SELECT 'Classic Beef Burger', 'Beef patty burger with lettuce, tomato, and house sauce.', 'Burger', 28000.00, 15000.00, 80, TRUE
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Classic Beef Burger');

INSERT INTO products (name, description, category, price, cost_price, stock_quantity, is_active)
SELECT 'Cheese Burger', 'Beef burger with cheddar cheese and house sauce.', 'Burger', 32000.00, 17500.00, 75, TRUE
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Cheese Burger');

INSERT INTO products (name, description, category, price, cost_price, stock_quantity, is_active)
SELECT 'Chicken Burger', 'Crispy chicken fillet burger with mayo and lettuce.', 'Burger', 30000.00, 16000.00, 70, TRUE
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Chicken Burger');

INSERT INTO products (name, description, category, price, cost_price, stock_quantity, is_active)
SELECT 'Fried Chicken', 'Crispy fried chicken served with signature seasoning.', 'Chicken', 25000.00, 13000.00, 100, TRUE
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Fried Chicken');

INSERT INTO products (name, description, category, price, cost_price, stock_quantity, is_active)
SELECT 'Chicken Rice Bowl', 'Rice bowl with crispy chicken bites and savory sauce.', 'Rice Bowl', 35000.00, 19000.00, 60, TRUE
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Chicken Rice Bowl');

INSERT INTO products (name, description, category, price, cost_price, stock_quantity, is_active)
SELECT 'Chicken Nuggets', 'Six pieces of crispy chicken nuggets.', 'Snack', 22000.00, 11500.00, 90, TRUE
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Chicken Nuggets');

INSERT INTO products (name, description, category, price, cost_price, stock_quantity, is_active)
SELECT 'French Fries', 'Golden fried potato fries with light salt.', 'Snack', 18000.00, 8000.00, 120, TRUE
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'French Fries');

INSERT INTO products (name, description, category, price, cost_price, stock_quantity, is_active)
SELECT 'Hot Dog', 'Sausage bun with ketchup, mustard, and crispy onion.', 'Snack', 24000.00, 12500.00, 65, TRUE
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Hot Dog');

INSERT INTO products (name, description, category, price, cost_price, stock_quantity, is_active)
SELECT 'Cola', 'Cold carbonated cola drink.', 'Drink', 12000.00, 5000.00, 150, TRUE
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Cola');

INSERT INTO products (name, description, category, price, cost_price, stock_quantity, is_active)
SELECT 'Iced Lemon Tea', 'Fresh iced lemon tea with light sweetness.', 'Drink', 14000.00, 6000.00, 130, TRUE
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Iced Lemon Tea');

INSERT INTO products (name, description, category, price, cost_price, stock_quantity, is_active)
SELECT 'Mineral Water', 'Bottled mineral water.', 'Drink', 8000.00, 3500.00, 160, TRUE
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Mineral Water');

INSERT INTO products (name, description, category, price, cost_price, stock_quantity, is_active)
SELECT 'Vanilla Sundae', 'Vanilla soft serve ice cream with syrup.', 'Dessert', 16000.00, 7000.00, 70, TRUE
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vanilla Sundae');
