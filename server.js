const express = require('express');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Global variables (Flash messages equivalent)
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/students', require('./routes/students'));
app.use('/instructors', require('./routes/instructors'));
app.use('/courses', require('./routes/courses'));
app.use('/groups', require('./routes/groups'));
app.use('/enrollments', require('./routes/enrollments'));
app.use('/grades', require('./routes/grades'));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
