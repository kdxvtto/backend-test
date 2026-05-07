import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const { default: pool } = await import("../configs/database.js");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = path.join(__dirname, "migrations");

const createMigrationTable = async (connection) => {
    await connection.query(`
        CREATE TABLE IF NOT EXISTS schema_migrations (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            filename VARCHAR(255) NOT NULL UNIQUE,
            executed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `);
};

const getAppliedMigrations = async (connection) => {
    const [rows] = await connection.query(`
        SELECT filename
        FROM schema_migrations
        ORDER BY filename ASC
    `);

    return new Set(rows.map((row) => row.filename));
};

const getMigrationFiles = async () => {
    const files = await fs.readdir(migrationsDir);

    return files
        .filter((file) => file.endsWith(".sql"))
        .sort();
};

const runMigrations = async () => {
    const connection = await pool.getConnection();

    try {
        await createMigrationTable(connection);

        const appliedMigrations = await getAppliedMigrations(connection);
        const migrationFiles = await getMigrationFiles();

        for (const file of migrationFiles) {
            if (appliedMigrations.has(file)) {
                console.log(`Skipping ${file}`);
                continue;
            }

            const filePath = path.join(migrationsDir, file);
            const sql = await fs.readFile(filePath, "utf8");

            console.log(`Running ${file}`);
            await connection.query(sql);
            await connection.query(
                `
                INSERT INTO schema_migrations (filename)
                VALUES (?)
                `,
                [file]
            );
        }

        console.log("Migration completed");
    } finally {
        connection.release();
        await pool.end();
    }
};

runMigrations().catch((error) => {
    console.error("Migration failed:", error.message);
    process.exit(1);
});
