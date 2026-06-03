// frontend/src/api/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5001';

// Retrieve the auth token from localStorage and attach it to every request
const getHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

// ===== Auth =====
export const registerAPI = (username, password) =>
    axios.post(`${BASE_URL}/register`, { username, password });

export const loginAPI = (username, password) =>
    axios.post(`${BASE_URL}/login`, { username, password });

// ===== Todos =====
export const getTodosAPI = () =>
    axios.get(`${BASE_URL}/todos`, getHeaders());

export const addTodoAPI = (task) =>
    axios.post(`${BASE_URL}/todos`, { task }, getHeaders());

export const editTodoAPI = (id, data) =>
    axios.put(`${BASE_URL}/todos/${id}`, data, getHeaders());

export const deleteTodoAPI = (id) =>
    axios.delete(`${BASE_URL}/todos/${id}`, getHeaders());
