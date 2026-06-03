// backend/middleware/taskLengthMiddleware.js

const taskLengthMiddleware = (req, res, next) => {
    // Only validate task length on POST requests
    if (req.method === 'POST') {
        const { task } = req.body;

        if (task && task.length > 140) {
            return res.status(400).json({
                message: `Task is too long (${task.length}/140 characters).`
            });
        }
    }

    next();
};

module.exports = taskLengthMiddleware;
