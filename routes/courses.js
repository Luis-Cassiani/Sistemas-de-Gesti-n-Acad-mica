const express = require('express');
const router = express.Router();
const isAuthenticated = require('../config/authMiddleware');
const db = require('../config/db');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM cursos');
        res.render('courses/list', { courses: rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

router.post('/add', isAuthenticated, async (req, res) => {
    const { nombre, duracion_horas, area_tematica, descripcion } = req.body;
    try {
        await db.query(
            'INSERT INTO cursos (nombre, duracion_horas, area_tematica, descripcion) VALUES (?, ?, ?, ?)',
            [nombre, duracion_horas, area_tematica, descripcion]
        );
        res.redirect('/courses');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

router.post('/edit/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const { nombre, duracion_horas, area_tematica, descripcion } = req.body;
    try {
        await db.query(
            'UPDATE cursos SET nombre=?, duracion_horas=?, area_tematica=?, descripcion=? WHERE id_curso=?',
            [nombre, duracion_horas, area_tematica, descripcion, id]
        );
        res.redirect('/courses');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

router.get('/delete/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM cursos WHERE id_curso = ?', [id]);
        res.redirect('/courses');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

module.exports = router;
