const express = require('express');
const router = express.Router();
const isAuthenticated = require('../config/authMiddleware');
const db = require('../config/db');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        // Stats for dashboard
        const [students] = await db.query('SELECT COUNT(*) as count FROM estudiantes');
        const [instructors] = await db.query('SELECT COUNT(*) as count FROM instructores');
        const [courses] = await db.query('SELECT COUNT(*) as count FROM cursos');
        const [groups] = await db.query('SELECT COUNT(*) as count FROM grupos');

        res.render('index', {
            stats: {
                students: students[0].count,
                instructors: instructors[0].count,
                courses: courses[0].count,
                groups: groups[0].count
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error del servidor');
    }
});

module.exports = router;
