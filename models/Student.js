const db = require('../config/db');

class Student {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM estudiantes');
        return rows;
    }

    static async create(data) {
        const { documento, nombres, apellidos, correo, telefono, direccion } = data;
        return db.query(
            'INSERT INTO estudiantes (documento, nombres, apellidos, correo, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?)',
            [documento, nombres, apellidos, correo, telefono, direccion]
        );
    }

    static async update(id, data) {
        const { documento, nombres, apellidos, correo, telefono, direccion, estado_matricula } = data;
        return db.query(
            'UPDATE estudiantes SET documento=?, nombres=?, apellidos=?, correo=?, telefono=?, direccion=?, estado_matricula=? WHERE id_estudiante=?',
            [documento, nombres, apellidos, correo, telefono, direccion, estado_matricula, id]
        );
    }

    static async delete(id) {
        return db.query('DELETE FROM estudiantes WHERE id_estudiante = ?', [id]);
    }
}

module.exports = Student;
