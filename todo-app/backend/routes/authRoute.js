// backend/routes/authRoute.js
const { register, login } = require('../controllers/userController');

const authRoute = (app) => {
    app.post('/register', register);
    app.post('/login', login);
};

module.exports = authRoute;