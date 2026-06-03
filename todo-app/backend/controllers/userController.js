// backend/controllers/userController.js
const jwt = require('jsonwebtoken');
const { users, todos } = require('./userDB');

const SECRET_KEY = 'MySecretKey123';

// ===== REGISTER =====
const register = (req, res) => {
    const { username, password } = req.body;

    console.log('Register Request:', req.body); // debug log

    // Validate required fields
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check for duplicate username
    const exists = users.find(u => u.username === username);
    if (exists) {
        return res.status(400).json({ message: 'Username is already taken.' });
    }

    // Save the new user
    users.push({ username, password });
    todos[username] = []; // initialize an empty todo list for the new user

    res.status(201).json({ message: 'Registration successful.' });
};

// ===== LOGIN =====
const login = (req, res) => {
    const { username, password } = req.body;

    // Find user by credentials
    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Generate JWT token
    const payload = { username: username };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.json({
        message: `Welcome, ${username}!`,
        token: token
    });
};

module.exports = { register, login };
