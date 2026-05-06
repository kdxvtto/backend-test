import pool from "../configs/database.js";

export const findAllAddOns = async () => {
    const [rows] = await pool.query(`
        SELECT
            id,
            name,
            description,
            price,
            cost_price,
            is_active
        FROM add_ons
        ORDER BY id DESC
    `);

    return rows;
};

export const findAddOnById = async (id) => {
    const [rows] = await pool.query(
        `
        SELECT
            id,
            name,
            description,
            price,
            cost_price,
            is_active
        FROM add_ons
        WHERE id = ?
        `,
        [id]
    );

    return rows[0] || null;
};

export const createAddOn = async (addOn) => {
    const [result] = await pool.query(
        `
        INSERT INTO add_ons (
            name,
            description,
            price,
            cost_price,
            is_active
        ) VALUES (?, ?, ?, ?, ?)
        `,
        [
            addOn.name,
            addOn.description,
            addOn.price,
            addOn.cost_price,
            addOn.is_active
        ]
    );

    return result.insertId;
};

export const updateAddOn = async (id, addOn) => {
    const allowedFields = [
        'name',
        'description',
        'price',
        'cost_price',
        'is_active'
    ];
    const fields = [];
    const values = [];

    for (const field of allowedFields) {
        if (addOn[field] !== undefined) {
            fields.push(`${field} = ?`);
            values.push(addOn[field]);
        }
    }

    if (fields.length === 0) {
        return false;
    }

    values.push(id);

    const [result] = await pool.query(
        `
        UPDATE add_ons
        SET ${fields.join(', ')}
        WHERE id = ?
        `,
        values
    );

    return result.affectedRows > 0;
};

export const deactivateAddOn = async (id) => {
    const [result] = await pool.query(
        `
        UPDATE add_ons
        SET is_active = FALSE
        WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows > 0;
};