import mysql from 'mysql2/promise';

const sslConfig = process.env.DB_SSL === 'true'
    ? { rejectUnauthorized: false }
    : undefined;

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: sslConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
