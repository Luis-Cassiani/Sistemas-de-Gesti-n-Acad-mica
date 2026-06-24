const db = require('../config/db');

class Grade {
    static async getAllWithDetails(groupId = null) {
        let sql = `
            SELECT c.*, e.nombres as student_nombres, e.apellidos as student_apellidos, cur.nombre as curso_nombre, g.id_grupo
            FROM calificaciones c
            JOIN matriculas m ON c.id_matricula = m.id_matricula
            JOIN estudiantes e ON m.id_estudiante = e.id_estudiante
            JOIN grupos g ON m.id_grupo = g.id_grupo
            JOIN cursos cur ON g.id_curso = cur.id_curso
        `;
        const params = [];
        if (groupId) {
            sql += ' WHERE g.id_grupo = ?';
            params.push(groupId);
        }
        const [rows] = await db.query(sql, params);
        return rows;
    }

    static async create(data) {
        const { id_matricula, modulo, nota } = data;
        return db.query('INSERT INTO calificaciones (id_matricula, modulo, nota) VALUES (?, ?, ?)', [id_matricula, modulo, nota]);
    }

    static async delete(id) {
        return db.query('DELETE FROM calificaciones WHERE id_calificacion = ?', [id]);
    }
}

module.exports = Grade;
