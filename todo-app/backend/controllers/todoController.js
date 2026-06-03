// backend/controllers/todoController.js
const { todos } = require('./userDB');

// ===== GET - Fetch all todos =====
const getTodos = (req, res) => {
    const { username } = req.user; // injected by jwtMiddleware
    res.json(todos[username] || []);
};

// ===== POST - Add a new todo =====
const addTodo = (req, res) => {
    const { username } = req.user;
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({ message: 'Task is required.' });
    }

    const newTodo = {
        id: Date.now(), // use timestamp as unique ID
        task: task,
        done: false
    };

    todos[username].push(newTodo);
    res.status(201).json({ message: 'Task added successfully.', todo: newTodo });
};

// ===== PUT - Edit a todo =====
const editTodo = (req, res) => {
    const { username } = req.user;
    const { id } = req.params;       // ID from URL e.g. /todos/123
    const { task, done } = req.body;

    const userTodos = todos[username];
    const index = userTodos.findIndex(t => t.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ message: 'Task not found.' });
    }

    // Update fields if provided
    if (task !== undefined) userTodos[index].task = task;
    if (done !== undefined) userTodos[index].done = done;

    res.json({ message: 'Task updated successfully.', todo: userTodos[index] });
};

// ===== DELETE - Remove a todo =====
const deleteTodo = (req, res) => {
    const { username } = req.user;
    const { id } = req.params;

    const before = todos[username].length;
    todos[username] = todos[username].filter(t => t.id !== parseInt(id));
    const after = todos[username].length;

    if (before === after) {
        return res.status(404).json({ message: 'Task not found.' });
    }

    res.json({ message: 'Task deleted successfully.' });
};

module.exports = { getTodos, addTodo, editTodo, deleteTodo };
