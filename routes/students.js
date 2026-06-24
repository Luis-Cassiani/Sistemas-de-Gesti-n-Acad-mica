const express = require('express');
const router = express.Router();
const isAuthenticated = require('../config/authMiddleware');
const Student = require('../models/Student');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const students = await Student.getAll();
        res.render('students/list', { students });
    } catch (err) {
        res.status(500).send('Error');
    }
});

router.post('/add', isAuthenticated, async (req, res) => {
    try {
        await Student.create(req.body);
        res.redirect('/students');
    } catch (err) {
        res.status(500).send('Error');
    }
});

router.post('/edit/:id', isAuthenticated, async (req, res) => {
    try {
        await Student.update(req.params.id, req.body);
        res.redirect('/students');
    } catch (err) {
        res.status(500).send('Error');
    }
});

router.get('/delete/:id', isAuthenticated, async (req, res) => {
    try {
        await Student.delete(req.params.id);
        res.redirect('/students');
    } catch (err) {
        res.status(500).send('Error');
    }
});

module.exports = router;
