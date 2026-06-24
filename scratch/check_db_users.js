const db = require('../config/db');

async function checkUsers() {
    try {
        const [rows] = await db.query('SELECT * FROM usuarios');
        console.log('Users in DB:', rows);
        process.exit(0);
    } catch (err) {
        console.error('Error connecting or querying DB:', err);
        process.exit(1);
    }
}

checkUsers();
