const db = require('../config/db');

class Group {
    static async getAllWithDetails() {
        const [rows] = await db.query(`
            SELECT g.*, c.nombre as curso_nombre, i.nombres as instructor_nombres, i.apellidos as instructor_apellidos 
            FROM grupos g
            JOIN cursos c ON g.id_curso = c.id_curso
            JOIN instructores i ON g.id_instructor = i.id_instructor
        `);
        return rows;
    }

    static async checkOverlap(id_instructor, horario, fecha_inicio, fecha_fin, excludeId = null) {
        let sql = `
            SELECT * FROM grupos 
            WHERE id_instructor = ? AND horario = ? 
            AND NOT (fecha_fin < ? OR fecha_inicio > ?)
        `;
        const params = [id_instructor, horario, fecha_inicio, fecha_fin];
        if (excludeId) {
            sql += ' AND id_grupo != ?';
            params.push(excludeId);
        }
        const [rows] = await db.query(sql, params);
        return rows.length > 0;
    }

    static async create(data) {
        const { id_curso, id_instructor, fecha_inicio, fecha_fin, horario, cupo_maximo } = data;
        return db.query(
            'INSERT INTO grupos (id_curso, id_instructor, fecha_inicio, fecha_fin, horario, cupo_maximo) VALUES (?, ?, ?, ?, ?, ?)',
            [id_curso, id_instructor, fecha_inicio, fecha_fin, horario, cupo_maximo]
        );
    }

    static async update(id, data) {
        const { id_curso, id_instructor, fecha_inicio, fecha_fin, horario, cupo_maximo } = data;
        return db.query(
            'UPDATE grupos SET id_curso=?, id_instructor=?, fecha_inicio=?, fecha_fin=?, horario=?, cupo_maximo=? WHERE id_grupo=?',
            [id_curso, id_instructor, fecha_inicio, fecha_fin, horario, cupo_maximo, id]
        );
    }

    static async delete(id) {
        return db.query('DELETE FROM grupos WHERE id_grupo = ?', [id]);
    }
}

module.exports = Group;
