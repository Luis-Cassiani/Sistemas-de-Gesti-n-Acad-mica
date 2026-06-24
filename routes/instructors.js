const express = require('express');
const router = express.Router();
const isAuthenticated = require('../config/authMiddleware');
const Instructor = require('../models/Instructor');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const instructors = await Instructor.getAll();
        res.render('instructors/list', { instructors });
    } catch (err) {
        res.status(500).send('Error');
    }
});

router.post('/add', isAuthenticated, async (req, res) => {
    try {
        await Instructor.create(req.body);
        res.redirect('/instructors');
    } catch (err) {
        res.status(500).send('Error');
    }
});

router.post('/edit/:id', isAuthenticated, async (req, res) => {
    try {
        await Instructor.update(req.params.id, req.body);
        res.redirect('/instructors');
    } catch (err) {
        res.status(500).send('Error');
    }
});

router.get('/delete/:id', isAuthenticated, async (req, res) => {
    try {
        await Instructor.delete(req.params.id);
        res.redirect('/instructors');
    } catch (err) {
        res.status(500).send('Error');
    }
});

module.exports = router;
