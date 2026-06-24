const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDB() {
    // Connection without database
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        multipleStatements: true
    });

    try {
        console.log('Connected to MySQL.');
        
        // Read schema.sql
        const schemaPath = path.join(__dirname, '../database/schema.sql');
        const sql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Executing schema.sql...');
        await connection.query(sql);
        
        console.log('Database and tables created successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error initializing database:', err.message);
        process.exit(1);
    } finally {
        await connection.end();
    }
}

initDB();
