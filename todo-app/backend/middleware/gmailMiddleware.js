// backend/middleware/gmailMiddleware.js

const gmailMiddleware = (req, res, next) => {
    const { username } = req.user; // injected by jwtMiddleware

    // Ensure username ends with @gmail.com
    if (!username.endsWith('@gmail.com')) {
        return res.status(403).json({
            message: 'Access denied: only @gmail.com accounts are allowed.'
        });
    }

    next(); // validation passed
};

module.exports = gmailMiddleware;
