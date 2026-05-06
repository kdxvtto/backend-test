import pool from "../configs/database.js";

export const findAllOrders = async () => {
    const [rows] = await pool.query(`
        SELECT
            id,
            order_number,
            customer_name,
            status,
            subtotal,
            discount,
            tax,
            total,
            created_at
        FROM orders
        ORDER BY id DESC
    `);

    return rows;
};

export const findOrderById = async (id) => {
    const [rows] = await pool.query(
        `
        SELECT
            id,
            order_number,
            customer_name,
            status,
            subtotal,
            discount,
            tax,
            total,
            notes,
            created_at
        FROM orders
        WHERE id = ?
        `,
        [id]
    );

    return rows[0] || null;
};

export const findOrderItems = async (orderId) => {
    const [rows] = await pool.query(
        `
        SELECT
            id,
            order_id,
            product_id,
            product_name,
            quantity,
            unit_price,
            unit_cost,
            subtotal
        FROM order_items
        WHERE order_id = ?
        ORDER BY id ASC
        `,
        [orderId]
    );

    return rows;
};

export const findOrderItemAddOns = async (orderId) => {
    const [rows] = await pool.query(
        `
        SELECT
            oia.id,
            oia.order_item_id,
            oia.add_on_id,
            oia.add_on_name,
            oia.quantity,
            oia.unit_price,
            oia.unit_cost,
            oia.subtotal
        FROM order_item_add_ons oia
        JOIN order_items oi ON oi.id = oia.order_item_id
        WHERE oi.order_id = ?
        ORDER BY oia.id ASC
        `,
        [orderId]
    );

    return rows;
};

export const findPaymentByOrderId = async (orderId) => {
    const [rows] = await pool.query(
        `
        SELECT
            id,
            order_id,
            payment_method,
            payment_status,
            amount,
            change_amount,
            paid_at
        FROM payments
        WHERE order_id = ?
        LIMIT 1
        `,
        [orderId]
    );

    return rows[0] || null;
};

export const createOrder = async (order, db = pool) => {
    const [result] = await db.query(
        `
        INSERT INTO orders (
            order_number,
            customer_name,
            status,
            subtotal,
            discount,
            tax,
            total,
            notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            order.order_number,
            order.customer_name,
            order.status,
            order.subtotal,
            order.discount,
            order.tax,
            order.total,
            order.notes
        ]
    );

    return result.insertId;
};

export const createOrderItem = async (item, db = pool) => {
    const [result] = await db.query(
        `
        INSERT INTO order_items (
            order_id,
            product_id,
            product_name,
            quantity,
            unit_price,
            unit_cost,
            subtotal
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
            item.order_id,
            item.product_id,
            item.product_name,
            item.quantity,
            item.unit_price,
            item.unit_cost,
            item.subtotal
        ]
    );

    return result.insertId;
};

export const createOrderItemAddOn = async (addOn, db = pool) => {
    const [result] = await db.query(
        `
        INSERT INTO order_item_add_ons (
            order_item_id,
            add_on_id,
            add_on_name,
            quantity,
            unit_price,
            unit_cost,
            subtotal
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
            addOn.order_item_id,
            addOn.add_on_id,
            addOn.add_on_name,
            addOn.quantity,
            addOn.unit_price,
            addOn.unit_cost,
            addOn.subtotal
        ]
    );

    return result.insertId;
};

export const createPayment = async (payment, db = pool) => {
    const [result] = await db.query(
        `
        INSERT INTO payments (
            order_id,
            payment_method,
            payment_status,
            amount,
            change_amount,
            paid_at
        ) VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
            payment.order_id,
            payment.payment_method,
            payment.payment_status,
            payment.amount,
            payment.change_amount,
            payment.paid_at
        ]
    );

    return result.insertId;
};

export const updateOrder = async (id, order, db = pool) => {
    const [result] = await db.query(
        `
        UPDATE orders
        SET
            customer_name = ?,
            status = ?,
            subtotal = ?,
            discount = ?,
            tax = ?,
            total = ?,
            notes = ?
        WHERE id = ?
        `,
        [
            order.customer_name,
            order.status,
            order.subtotal,
            order.discount,
            order.tax,
            order.total,
            order.notes,
            id
        ]
    );

    return result.affectedRows > 0;
};

export const updatePaymentByOrderId = async (orderId, payment, db = pool) => {
    const [result] = await db.query(
        `
        UPDATE payments
        SET
            payment_method = ?,
            payment_status = ?,
            amount = ?,
            change_amount = ?,
            paid_at = ?
        WHERE order_id = ?
        `,
        [
            payment.payment_method,
            payment.payment_status,
            payment.amount,
            payment.change_amount,
            payment.paid_at,
            orderId
        ]
    );

    return result.affectedRows > 0;
};

export const deleteOrderItemAddOns = async (orderId, db = pool) => {
    const [result] = await db.query(
        `
        DELETE oia
        FROM order_item_add_ons oia
        JOIN order_items oi ON oi.id = oia.order_item_id
        WHERE oi.order_id = ?
        `,
        [orderId]
    );

    return result.affectedRows;
};

export const deleteOrderItems = async (orderId, db = pool) => {
    const [result] = await db.query(
        `
        DELETE FROM order_items
        WHERE order_id = ?
        `,
        [orderId]
    );

    return result.affectedRows;
};

export const cancelOrder = async (id, db = pool) => {
    const [result] = await db.query(
        `
        UPDATE orders
        SET status = 'cancelled'
        WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows > 0;
};
