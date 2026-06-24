const express = require('express');
const router = express.Router();
const isAuthenticated = require('../config/authMiddleware');
const Group = require('../models/Group');
const Course = require('../models/Course');
const Instructor = require('../models/Instructor');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const groups = await Group.getAllWithDetails();
        const courses = await Course.getAll();
        const instructors = await Instructor.getActive();
        res.render('groups/list', { groups, courses, instructors, error: req.query.error });
    } catch (err) {
        res.status(500).send('Error');
    }
});

router.post('/add', isAuthenticated, async (req, res) => {
    const { id_instructor, horario, fecha_inicio, fecha_fin } = req.body;
    try {
        const hasOverlap = await Group.checkOverlap(id_instructor, horario, fecha_inicio, fecha_fin);
        if (hasOverlap) {
            return res.redirect('/groups?error=El instructor ya tiene un grupo asignado en este horario.');
        }
        await Group.create(req.body);
        res.redirect('/groups');
    } catch (err) {
        res.status(500).send('Error');
    }
});

router.post('/edit/:id', isAuthenticated, async (req, res) => {
    const { id_instructor, horario, fecha_inicio, fecha_fin } = req.body;
    try {
        const hasOverlap = await Group.checkOverlap(id_instructor, horario, fecha_inicio, fecha_fin, req.params.id);
        if (hasOverlap) {
            return res.redirect('/groups?error=Cruce de horarios detectado.');
        }
        await Group.update(req.params.id, req.body);
        res.redirect('/groups');
    } catch (err) {
        res.status(500).send('Error');
    }
});

router.get('/delete/:id', isAuthenticated, async (req, res) => {
    try {
        await Group.delete(req.params.id);
        res.redirect('/groups');
    } catch (err) {
        res.status(500).send('Error');
    }
});

module.exports = router;
