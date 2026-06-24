const db = require('../config/db');

class Course {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM cursos');
        return rows;
    }

    static async create(data) {
        const { nombre, duracion_horas, area_tematica, descripcion } = data;
        return db.query(
            'INSERT INTO cursos (nombre, duracion_horas, area_tematica, descripcion) VALUES (?, ?, ?, ?)',
            [nombre, duracion_horas, area_tematica, descripcion]
        );
    }

    static async update(id, data) {
        const { nombre, duracion_horas, area_tematica, descripcion } = data;
        return db.query(
            'UPDATE cursos SET nombre=?, duracion_horas=?, area_tematica=?, descripcion=? WHERE id_curso=?',
            [nombre, duracion_horas, area_tematica, descripcion, id]
        );
    }

    static async delete(id) {
        return db.query('DELETE FROM cursos WHERE id_curso = ?', [id]);
    }
}

module.exports = Course;
