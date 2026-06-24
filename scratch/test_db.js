const db = require('../config/db');

async function main() {
    try {
        const [tables] = await db.query('SHOW TABLES');
        console.log('Tables in database:', tables);
        
        for (let tableObj of tables) {
            const tableName = Object.values(tableObj)[0];
            const [rows] = await db.query(`SELECT * FROM ${tableName} LIMIT 5`);
            console.log(`\nTable ${tableName}:`);
            console.log(rows);
        }
        process.exit(0);
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
}

main();
