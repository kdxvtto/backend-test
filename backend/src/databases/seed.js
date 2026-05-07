import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const { default: pool } = await import("../configs/database.js");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const seedsDir = path.join(__dirname, "seeds");

const createSeedTable = async (connection) => {
    await connection.query(`
        CREATE TABLE IF NOT EXISTS database_seeds (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            filename VARCHAR(255) NOT NULL UNIQUE,
            executed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `);
};

const getAppliedSeeds = async (connection) => {
    const [rows] = await connection.query(`
        SELECT filename
        FROM database_seeds
        ORDER BY filename ASC
    `);

    return new Set(rows.map((row) => row.filename));
};

const getSeedFiles = async () => {
    const files = await fs.readdir(seedsDir);

    return files
        .filter((file) => file.endsWith(".sql"))
        .sort();
};

const getSqlStatements = (sql) => {
    return sql
        .split(";")
        .map((statement) => statement.trim())
        .filter(Boolean);
};

const runSeeds = async () => {
    const connection = await pool.getConnection();

    try {
        await createSeedTable(connection);

        const appliedSeeds = await getAppliedSeeds(connection);
        const seedFiles = await getSeedFiles();

        for (const file of seedFiles) {
            if (appliedSeeds.has(file)) {
                console.log(`Skipping ${file}`);
                continue;
            }

            const filePath = path.join(seedsDir, file);
            const sql = await fs.readFile(filePath, "utf8");
            const statements = getSqlStatements(sql);

            console.log(`Running ${file}`);

            for (const statement of statements) {
                await connection.query(statement);
            }

            await connection.query(
                `
                INSERT INTO database_seeds (filename)
                VALUES (?)
                `,
                [file]
            );
        }

        console.log("Seed completed");
    } finally {
        connection.release();
        await pool.end();
    }
};

runSeeds().catch((error) => {
    console.error("Seed failed:", error.message);
    process.exit(1);
});
