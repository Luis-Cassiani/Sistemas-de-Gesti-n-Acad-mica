const bcrypt = require('bcryptjs');

const hashInDb = '$2a$10$76oGv/r0vI7UjL9fB0Q1OeB.yU.R2G0O8eGvO5k6.m.4.O.R5.O5.';

bcrypt.compare('admin123', hashInDb).then(result => {
    console.log('Does "admin123" match?', result);
}).catch(err => {
    console.error('Error:', err);
});

// Let's generate a new correct hash for admin123
bcrypt.hash('admin123', 10).then(newHash => {
    console.log('New correct hash for "admin123":', newHash);
});
