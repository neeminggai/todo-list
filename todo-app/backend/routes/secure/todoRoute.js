// backend/routes/secure/todoRoute.js
const jwtMiddleware         = require('../../middleware/jwtMiddleware');
const gmailMiddleware       = require('../../middleware/gmailMiddleware');
const contentTypeMiddleware = require('../../middleware/contentTypeMiddleware');
const taskLengthMiddleware  = require('../../middleware/taskLengthMiddleware');

const { getTodos, addTodo, editTodo, deleteTodo } = require('../../controllers/todoController');

const todoRoute = (app) => {

    // Middleware pipeline for all todo routes:
    // jwt → gmail → contentType → taskLength → Controller

    app.get('/todos',
        jwtMiddleware,
        gmailMiddleware,
        getTodos                          // no content-type or length check needed for GET
    );

    app.post('/todos',
        jwtMiddleware,
        gmailMiddleware,
        contentTypeMiddleware,
        taskLengthMiddleware,
        addTodo
    );

    app.put('/todos/:id',
        jwtMiddleware,
        gmailMiddleware,
        contentTypeMiddleware,
        editTodo
    );

    app.delete('/todos/:id',
        jwtMiddleware,
        gmailMiddleware,
        deleteTodo
    );
};

module.exports = todoRoute;
