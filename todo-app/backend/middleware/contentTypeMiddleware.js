// backend/middleware/contentTypeMiddleware.js

const contentTypeMiddleware = (req, res, next) => {
    const contentType = req.headers['content-type'];

    // POST and PUT requests must send JSON
    if (req.method === 'POST' || req.method === 'PUT') {
        if (!contentType || !contentType.includes('application/json')) {
            return res.status(400).json({
                message: 'Content-Type must be application/json.'
            });
        }
    }

    next();
};

module.exports = contentTypeMiddleware;
