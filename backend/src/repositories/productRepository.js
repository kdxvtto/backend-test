import pool from "../configs/database.js";

export const findAllProducts = async (db = pool) => {
    const [rows] = await db.query(`
        SELECT
            id,
            name,
            description,
            category,
            price,
            cost_price,
            stock_quantity,
            is_active
        FROM products
        ORDER BY id DESC
    `);

    return rows;
};

export const findProductById = async (id, db = pool) => {
    const [rows] = await db.query(
        `
        SELECT
            id,
            name,
            description,
            category,
            price,
            cost_price,
            stock_quantity,
            is_active
        FROM products
        WHERE id = ?
        `,
        [id]
    );

    return rows[0] || null;
};

export const createProduct = async (product, db = pool) => {
    const [result] = await db.query(
        `
        INSERT INTO products (
            name,
            description,
            category,
            price,
            cost_price,
            stock_quantity,
            is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
            product.name,
            product.description,
            product.category,
            product.price,
            product.cost_price,
            product.stock_quantity,
            product.is_active
        ]
    );

    return result.insertId;
};

export const updateProduct = async (id, product, db = pool) => {
    const allowedFields = [
        'name',
        'description',
        'category',
        'price',
        'cost_price',
        'stock_quantity',
        'is_active'
    ];
    const fields = [];
    const values = [];

    for (const field of allowedFields) {
        if (product[field] !== undefined) {
            fields.push(`${field} = ?`);
            values.push(product[field]);
        }
    }

    if (fields.length === 0) {
        return false;
    }

    values.push(id);

    const [result] = await db.query(
        `
        UPDATE products
        SET ${fields.join(', ')}
        WHERE id = ?
        `,
        values
    );

    return result.affectedRows > 0;
};

export const deactivateProduct = async (id, db = pool) => {
    const [result] = await db.query(
        `
        UPDATE products
        SET is_active = FALSE
        WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows > 0;
};

export const decreaseProductStock = async (id, quantity, db = pool) => {
    const [result] = await db.query(
        `
        UPDATE products
        SET stock_quantity = stock_quantity - ?
        WHERE id = ? AND stock_quantity >= ?
        `,
        [quantity, id, quantity]
    );

    return result.affectedRows > 0;
};

export const increaseProductStock = async (id, quantity, db = pool) => {
    const [result] = await db.query(
        `
        UPDATE products
        SET stock_quantity = stock_quantity + ?
        WHERE id = ?
        `,
        [quantity, id]
    );

    return result.affectedRows > 0;
};
