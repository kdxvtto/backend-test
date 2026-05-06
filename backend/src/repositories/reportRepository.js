import pool from "../configs/database.js";

export const getTopSellingProducts = async () => {
    const [rows] = await pool.query(`
        SELECT
            p.id,
            p.name,
            p.category,
            SUM(oi.quantity) AS total_sold,
            SUM(oi.subtotal) AS total_sales
        FROM order_items oi
        JOIN orders o ON o.id = oi.order_id
        JOIN products p ON p.id = oi.product_id
        WHERE o.status = 'paid'
        GROUP BY p.id, p.name, p.category
        ORDER BY total_sold DESC
        LIMIT 3
    `);

    return rows;
};

export const getLowestOrderedProducts = async () => {
    const [rows] = await pool.query(`
        SELECT
            p.id,
            p.name,
            p.category,
            COALESCE(s.total_sold, 0) AS total_sold,
            COALESCE(s.total_sales, 0) AS total_sales
        FROM products p
        LEFT JOIN (
            SELECT
                oi.product_id,
                SUM(oi.quantity) AS total_sold,
                SUM(oi.subtotal) AS total_sales
            FROM order_items oi
            JOIN orders o ON o.id = oi.order_id
            WHERE o.status = 'paid'
            GROUP BY oi.product_id
        ) s ON s.product_id = p.id
        ORDER BY total_sold ASC, p.id ASC
        LIMIT 3
    `);

    return rows;
};

export const getSalesReport = async () => {
    const [rows] = await pool.query(`
        SELECT
            (SELECT COUNT(*) FROM orders WHERE status = 'paid') AS total_orders,
            (SELECT COALESCE(SUM(total), 0) FROM orders WHERE status = 'paid') AS revenue,
            (
                SELECT COALESCE(SUM(oi.unit_cost * oi.quantity), 0)
                FROM order_items oi
                JOIN orders o ON o.id = oi.order_id
                WHERE o.status = 'paid'
            ) AS product_cost,
            (
                SELECT COALESCE(SUM(oia.unit_cost * oia.quantity), 0)
                FROM order_item_add_ons oia
                JOIN order_items oi ON oi.id = oia.order_item_id
                JOIN orders o ON o.id = oi.order_id
                WHERE o.status = 'paid'
            ) AS add_on_cost
    `);

    const report = rows[0];
    const revenue = Number(report.revenue);
    const productCost = Number(report.product_cost);
    const addOnCost = Number(report.add_on_cost);
    const totalCost = productCost + addOnCost;

    return {
        total_orders: Number(report.total_orders),
        revenue,
        product_cost: productCost,
        add_on_cost: addOnCost,
        net_profit: revenue - totalCost
    };
};
