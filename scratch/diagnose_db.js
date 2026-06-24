const mysql = require('mysql2/promise');
require('dotenv').config();

const commonPasswords = ['', 'root', 'admin', '1234', '123456', '12345678', 'mysql'];

async function diagnose() {
    console.log('--- DIAGNÓSTICO DE CONEXIÓN A BASE DE DATOS ---');
    console.log(`Host: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`Usuario: ${process.env.DB_USER || 'root'}`);
    console.log(`Base de datos requerida: ${process.env.DB_NAME || 'gestion_academica'}`);
    console.log('\nProbando contraseñas comunes en tu MySQL local...\n');

    let success = false;
    for (const pass of commonPasswords) {
        try {
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST || 'localhost',
                user: process.env.DB_USER || 'root',
                password: pass
            });
            console.log(`✅ ¡ÉXITO! Conexión exitosa con la contraseña: "${pass}"`);
            await connection.end();
            success = true;
            
            // Now check if database exists
            try {
                const connDb = await mysql.createConnection({
                    host: process.env.DB_HOST || 'localhost',
                    user: process.env.DB_USER || 'root',
                    password: pass,
                    database: process.env.DB_NAME || 'gestion_academica'
                });
                console.log(`   └─ ¡La base de datos "${process.env.DB_NAME}" ya existe y está lista!`);
                await connDb.end();
            } catch (dbErr) {
                if (dbErr.errno === 1049) { // Unknown database
                    console.log(`   └─ ⚠️ La conexión sirve, pero la base de datos "${process.env.DB_NAME}" aún no ha sido creada.`);
                    console.log(`      Para crearla, puedes ejecutar: node scratch/init_db.js`);
                } else {
                    console.log(`   └─ ⚠️ Error al conectar a la base de datos: ${dbErr.message}`);
                }
            }
            break;
        } catch (err) {
            console.log(`❌ Falló con la contraseña: "${pass}" (Error: ${err.code})`);
        }
    }

    if (!success) {
        console.log('\n❌ Ninguna de las contraseñas comunes funcionó.');
        console.log('Por favor, ingresa tu contraseña personalizada de MySQL en el archivo .env en la línea: DB_PASS=tu_contraseña');
    }
    process.exit(0);
}

diagnose();
