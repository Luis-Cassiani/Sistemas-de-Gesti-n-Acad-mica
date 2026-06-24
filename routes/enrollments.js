const express = require('express');
const router = express.Router();
const isAuthenticated = require('../config/authMiddleware');
const Enrollment = require('../models/Enrollment');
const Student = require('../models/Student');
const Group = require('../models/Group');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const enrollments = await Enrollment.getAllWithDetails();
        const students = await Student.getAll();
        const groups = await Group.getAllWithDetails();
        res.render('enrollments/list', { enrollments, students, groups, error: req.query.error });
    } catch (err) {
        res.status(500).send('Error');
    }
});

router.post('/add', isAuthenticated, async (req, res) => {
    const { id_estudiante, id_grupo } = req.body;
    try {
        if (await Enrollment.isAlreadyEnrolled(id_estudiante, id_grupo)) {
            return res.redirect('/enrollments?error=Ya matriculado en este grupo.');
        }
        const occupancy = await Enrollment.getGroupOccupancy(id_grupo);
        if (occupancy.current >= occupancy.max) {
            return res.redirect('/enrollments?error=Grupo lleno.');
        }
        await Enrollment.create(id_estudiante, id_grupo);
        res.redirect('/enrollments');
    } catch (err) {
        res.status(500).send('Error');
    }
});

router.get('/cancel/:id', isAuthenticated, async (req, res) => {
    try {
        await Enrollment.cancel(req.params.id);
        res.redirect('/enrollments');
    } catch (err) {
        res.status(500).send('Error');
    }
});

module.exports = router;
