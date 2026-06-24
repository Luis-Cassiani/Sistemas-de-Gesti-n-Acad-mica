const express = require('express');
const router = express.Router();
const isAuthenticated = require('../config/authMiddleware');
const Grade = require('../models/Grade');
const Group = require('../models/Group');
const Enrollment = require('../models/Enrollment');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const { group_id } = req.query;
        const grades = await Grade.getAllWithDetails(group_id);
        const groups = await Group.getAllWithDetails();
        const enrollments = await Enrollment.getAllWithDetails();
        res.render('grades/list', { grades, groups, enrollments, selectedGroup: group_id, error: req.query.error });
    } catch (err) {
        res.status(500).send('Error');
    }
});

router.post('/add', isAuthenticated, async (req, res) => {
    const { nota } = req.body;
    try {
        const n = parseFloat(nota);
        if (isNaN(n) || n < 0 || n > 5) {
            return res.redirect('/grades?error=Nota fuera de rango (0.0 - 5.0)');
        }
        await Grade.create(req.body);
        res.redirect('/grades');
    } catch (err) {
        res.status(500).send('Error');
    }
});

router.get('/delete/:id', isAuthenticated, async (req, res) => {
    try {
        await Grade.delete(req.params.id);
        res.redirect('/grades');
    } catch (err) {
        res.status(500).send('Error');
    }
});

module.exports = router;
