const db = require('../config/db');
const bcrypt = require('bcryptjs');

async function resetPassword() {
    try {
        const hash = await bcrypt.hash('admin123', 10);
        await db.query('UPDATE usuarios SET password = ? WHERE username = ?', [hash, 'admin']);
        console.log('Password for user "admin" has been reset to "admin123"');
        process.exit(0);
    } catch (err) {
        console.error('Error resetting password:', err.message);
        process.exit(1);
    }
}

resetPassword();
