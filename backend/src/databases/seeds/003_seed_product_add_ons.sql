INSERT INTO product_add_ons (product_id, add_on_id)
SELECT p.id, a.id FROM products p CROSS JOIN add_ons a
WHERE p.name = 'Classic Beef Burger' AND a.name IN ('Extra Cheese', 'Extra Beef Patty', 'Extra Egg', 'BBQ Sauce', 'Spicy Sauce')
AND NOT EXISTS (
  SELECT 1 FROM product_add_ons pa WHERE pa.product_id = p.id AND pa.add_on_id = a.id
);

INSERT INTO product_add_ons (product_id, add_on_id)
SELECT p.id, a.id FROM products p CROSS JOIN add_ons a
WHERE p.name = 'Cheese Burger' AND a.name IN ('Extra Cheese', 'Extra Beef Patty', 'Extra Egg', 'BBQ Sauce', 'Spicy Sauce')
AND NOT EXISTS (
  SELECT 1 FROM product_add_ons pa WHERE pa.product_id = p.id AND pa.add_on_id = a.id
);

INSERT INTO product_add_ons (product_id, add_on_id)
SELECT p.id, a.id FROM products p CROSS JOIN add_ons a
WHERE p.name = 'Chicken Burger' AND a.name IN ('Extra Cheese', 'Extra Chicken Fillet', 'Extra Egg', 'BBQ Sauce', 'Spicy Sauce')
AND NOT EXISTS (
  SELECT 1 FROM product_add_ons pa WHERE pa.product_id = p.id AND pa.add_on_id = a.id
);

INSERT INTO product_add_ons (product_id, add_on_id)
SELECT p.id, a.id FROM products p CROSS JOIN add_ons a
WHERE p.name = 'Fried Chicken' AND a.name IN ('BBQ Sauce', 'Spicy Sauce', 'Large Drink Upgrade')
AND NOT EXISTS (
  SELECT 1 FROM product_add_ons pa WHERE pa.product_id = p.id AND pa.add_on_id = a.id
);

INSERT INTO product_add_ons (product_id, add_on_id)
SELECT p.id, a.id FROM products p CROSS JOIN add_ons a
WHERE p.name = 'Chicken Rice Bowl' AND a.name IN ('Extra Chicken Fillet', 'Extra Egg', 'BBQ Sauce', 'Spicy Sauce', 'Large Drink Upgrade')
AND NOT EXISTS (
  SELECT 1 FROM product_add_ons pa WHERE pa.product_id = p.id AND pa.add_on_id = a.id
);

INSERT INTO product_add_ons (product_id, add_on_id)
SELECT p.id, a.id FROM products p CROSS JOIN add_ons a
WHERE p.name = 'Chicken Nuggets' AND a.name IN ('Extra Nuggets', 'BBQ Sauce', 'Spicy Sauce', 'Large Drink Upgrade')
AND NOT EXISTS (
  SELECT 1 FROM product_add_ons pa WHERE pa.product_id = p.id AND pa.add_on_id = a.id
);

INSERT INTO product_add_ons (product_id, add_on_id)
SELECT p.id, a.id FROM products p CROSS JOIN add_ons a
WHERE p.name = 'French Fries' AND a.name IN ('Large Fries Upgrade', 'BBQ Sauce', 'Spicy Sauce')
AND NOT EXISTS (
  SELECT 1 FROM product_add_ons pa WHERE pa.product_id = p.id AND pa.add_on_id = a.id
);

INSERT INTO product_add_ons (product_id, add_on_id)
SELECT p.id, a.id FROM products p CROSS JOIN add_ons a
WHERE p.name = 'Hot Dog' AND a.name IN ('Extra Cheese', 'BBQ Sauce', 'Spicy Sauce', 'Large Drink Upgrade')
AND NOT EXISTS (
  SELECT 1 FROM product_add_ons pa WHERE pa.product_id = p.id AND pa.add_on_id = a.id
);

INSERT INTO product_add_ons (product_id, add_on_id)
SELECT p.id, a.id FROM products p CROSS JOIN add_ons a
WHERE p.name IN ('Cola', 'Iced Lemon Tea') AND a.name IN ('Large Drink Upgrade')
AND NOT EXISTS (
  SELECT 1 FROM product_add_ons pa WHERE pa.product_id = p.id AND pa.add_on_id = a.id
);

INSERT INTO product_add_ons (product_id, add_on_id)
SELECT p.id, a.id FROM products p CROSS JOIN add_ons a
WHERE p.name = 'Vanilla Sundae' AND a.name IN ('Chocolate Syrup')
AND NOT EXISTS (
  SELECT 1 FROM product_add_ons pa WHERE pa.product_id = p.id AND pa.add_on_id = a.id
);
