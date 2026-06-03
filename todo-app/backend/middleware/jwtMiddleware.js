// backend/middleware/jwtMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'MySecretKey123';

const jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided. Please log in.' });
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // attach decoded user info to the request
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token is invalid or expired.' });
    }
};

module.exports = jwtMiddleware;
