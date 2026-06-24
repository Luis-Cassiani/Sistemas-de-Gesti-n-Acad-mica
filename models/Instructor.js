const db = require('../config/db');

class Instructor {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM instructores');
        return rows;
    }

    static async getActive() {
        const [rows] = await db.query('SELECT * FROM instructores WHERE estado = "activo"');
        return rows;
    }

    static async create(data) {
        const { nombres, apellidos, especialidad, correo, telefono } = data;
        return db.query(
            'INSERT INTO instructores (nombres, apellidos, especialidad, correo, telefono) VALUES (?, ?, ?, ?, ?)',
            [nombres, apellidos, especialidad, correo, telefono]
        );
    }

    static async update(id, data) {
        const { nombres, apellidos, especialidad, correo, telefono, estado } = data;
        return db.query(
            'UPDATE instructores SET nombres=?, apellidos=?, especialidad=?, correo=?, telefono=?, estado=? WHERE id_instructor=?',
            [nombres, apellidos, especialidad, correo, telefono, estado, id]
        );
    }

    static async delete(id) {
        return db.query('DELETE FROM instructores WHERE id_instructor = ?', [id]);
    }
}

module.exports = Instructor;
