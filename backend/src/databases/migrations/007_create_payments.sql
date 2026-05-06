CREATE TABLE payments (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    order_id INT UNSIGNED NOT NULL,
    payment_method enum('cash', 'card') NOT NULL DEFAULT 'cash',
    payment_status enum('pending', 'paid', 'failed') NOT NULL DEFAULT 'pending',
    amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    change_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    paid_at TIMESTAMP NULL DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_payment_order FOREIGN KEY (order_id) REFERENCES orders(id)
);
