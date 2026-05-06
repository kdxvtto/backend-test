CREATE TABLE product_add_ons (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    product_id INT UNSIGNED NOT NULL,
    add_on_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY unique_product_add_on (product_id, add_on_id),
    CONSTRAINT fk_product_add_on_product FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT fk_product_add_on_add_on FOREIGN KEY (add_on_id) REFERENCES add_ons(id)
);
