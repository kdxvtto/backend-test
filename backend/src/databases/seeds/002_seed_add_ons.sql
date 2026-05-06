INSERT INTO add_ons (name, description, price, cost_price, is_active)
SELECT 'Extra Cheese', 'Additional cheddar cheese slice.', 5000.00, 2500.00, TRUE
WHERE NOT EXISTS (SELECT 1 FROM add_ons WHERE name = 'Extra Cheese');

INSERT INTO add_ons (name, description, price, cost_price, is_active)
SELECT 'Extra Beef Patty', 'Additional grilled beef patty.', 14000.00, 8000.00, TRUE
WHERE NOT EXISTS (SELECT 1 FROM add_ons WHERE name = 'Extra Beef Patty');

INSERT INTO add_ons (name, description, price, cost_price, is_active)
SELECT 'Extra Chicken Fillet', 'Additional crispy chicken fillet.', 12000.00, 7000.00, TRUE
WHERE NOT EXISTS (SELECT 1 FROM add_ons WHERE name = 'Extra Chicken Fillet');

INSERT INTO add_ons (name, description, price, cost_price, is_active)
SELECT 'Extra Egg', 'Additional fried egg topping.', 6000.00, 3000.00, TRUE
WHERE NOT EXISTS (SELECT 1 FROM add_ons WHERE name = 'Extra Egg');

INSERT INTO add_ons (name, description, price, cost_price, is_active)
SELECT 'BBQ Sauce', 'Smoky barbecue sauce.', 3000.00, 1000.00, TRUE
WHERE NOT EXISTS (SELECT 1 FROM add_ons WHERE name = 'BBQ Sauce');

INSERT INTO add_ons (name, description, price, cost_price, is_active)
SELECT 'Spicy Sauce', 'Hot spicy sauce.', 3000.00, 1000.00, TRUE
WHERE NOT EXISTS (SELECT 1 FROM add_ons WHERE name = 'Spicy Sauce');

INSERT INTO add_ons (name, description, price, cost_price, is_active)
SELECT 'Large Fries Upgrade', 'Upgrade regular fries to large size.', 7000.00, 3500.00, TRUE
WHERE NOT EXISTS (SELECT 1 FROM add_ons WHERE name = 'Large Fries Upgrade');

INSERT INTO add_ons (name, description, price, cost_price, is_active)
SELECT 'Large Drink Upgrade', 'Upgrade regular drink to large size.', 5000.00, 2200.00, TRUE
WHERE NOT EXISTS (SELECT 1 FROM add_ons WHERE name = 'Large Drink Upgrade');

INSERT INTO add_ons (name, description, price, cost_price, is_active)
SELECT 'Extra Nuggets', 'Additional three pieces of chicken nuggets.', 10000.00, 5500.00, TRUE
WHERE NOT EXISTS (SELECT 1 FROM add_ons WHERE name = 'Extra Nuggets');

INSERT INTO add_ons (name, description, price, cost_price, is_active)
SELECT 'Chocolate Syrup', 'Chocolate syrup topping for dessert.', 4000.00, 1500.00, TRUE
WHERE NOT EXISTS (SELECT 1 FROM add_ons WHERE name = 'Chocolate Syrup');
