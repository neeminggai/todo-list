// backend/controllers/userDB.js

// In-memory user store (simulates a database)
const users = [];

// In-memory todos store, keyed by username
const todos = {};
// Example: { "user@gmail.com": [{ id: 1, task: "Buy groceries", done: false }] }

module.exports = { users, todos };
