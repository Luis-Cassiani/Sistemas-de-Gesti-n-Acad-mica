const db = require('../config/db');

async function check() {
    try {
        const [estudiantes] = await db.query('SELECT COUNT(*) as c FROM estudiantes');
        const [cursos] = await db.query('SELECT COUNT(*) as c FROM cursos');
        const [grupos] = await db.query('SELECT COUNT(*) as c FROM grupos');
        const [matriculas] = await db.query('SELECT COUNT(*) as c FROM matriculas');
        
        console.log('Students count:', estudiantes[0].c);
        console.log('Courses count:', cursos[0].c);
        console.log('Groups count:', grupos[0].c);
        console.log('Enrollments (matriculas) count:', matriculas[0].c);

        const [enrollmentDetails] = await db.query(`
            SELECT m.*, e.nombres as student_nombres, e.apellidos as student_apellidos, c.nombre as curso_nombre, g.horario
            FROM matriculas m
            JOIN estudiantes e ON m.id_estudiante = e.id_estudiante
            JOIN grupos g ON m.id_grupo = g.id_grupo
            JOIN cursos c ON g.id_curso = c.id_curso
        `);
        console.log('Enrollments with details returned:', enrollmentDetails.length);
        console.log('Details:', enrollmentDetails);

        process.exit(0);
    } catch (err) {
        console.error('Error querying:', err);
        process.exit(1);
    }
}

check();
