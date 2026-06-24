const db = require('../config/db');

class Enrollment {
    static async getAllWithDetails() {
        const [rows] = await db.query(`
            SELECT m.*, e.nombres as student_nombres, e.apellidos as student_apellidos, c.nombre as curso_nombre, g.horario
            FROM matriculas m
            JOIN estudiantes e ON m.id_estudiante = e.id_estudiante
            JOIN grupos g ON m.id_grupo = g.id_grupo
            JOIN cursos c ON g.id_curso = c.id_curso
        `);
        return rows;
    }

    static async isAlreadyEnrolled(id_estudiante, id_grupo) {
        const [rows] = await db.query('SELECT * FROM matriculas WHERE id_estudiante = ? AND id_grupo = ?', [id_estudiante, id_grupo]);
        return rows.length > 0;
    }

    static async getGroupOccupancy(id_grupo) {
        const [count] = await db.query('SELECT COUNT(*) as current FROM matriculas WHERE id_grupo = ?', [id_grupo]);
        const [group] = await db.query('SELECT cupo_maximo FROM grupos WHERE id_grupo = ?', [id_grupo]);
        return { current: count[0].current, max: group[0].cupo_maximo };
    }

    static async create(id_estudiante, id_grupo) {
        return db.query('INSERT INTO matriculas (id_estudiante, id_grupo) VALUES (?, ?)', [id_estudiante, id_grupo]);
    }

    static async cancel(id) {
        return db.query('UPDATE matriculas SET estado = "cancelada" WHERE id_matricula = ?', [id]);
    }
}

module.exports = Enrollment;
