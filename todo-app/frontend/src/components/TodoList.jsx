// frontend/src/components/TodoList.jsx
import { useState, useEffect } from 'react';
import { getTodosAPI, addTodoAPI, editTodoAPI, deleteTodoAPI } from '../api/api';

function TodoList({ onLogout }) {
    const [todos, setTodos]       = useState([]);
    const [newTask, setNewTask]   = useState('');
    const [editId, setEditId]     = useState(null);
    const [editText, setEditText] = useState('');
    const [message, setMessage]   = useState('');

    // Load todos when the component mounts
    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            const res = await getTodosAPI();
            setTodos(res.data);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to load tasks.');
        }
    };

    // ===== Add Task =====
    const handleAdd = async () => {
        if (!newTask.trim()) return;

        try {
            await addTodoAPI(newTask);
            setNewTask('');
            setMessage('');
            loadTodos(); // reload the list after adding
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to add task.');
        }
    };

    // ===== Edit Task =====
    const handleEdit = async (id) => {
        try {
            await editTodoAPI(id, { task: editText });
            setEditId(null);
            setEditText('');
            loadTodos();
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to update task.');
        }
    };

    // ===== Toggle Done =====
    const handleToggle = async (todo) => {
        try {
            await editTodoAPI(todo.id, { done: !todo.done });
            loadTodos();
        } catch (err) {
            setMessage('Failed to update task status.');
        }
    };

    // ===== Delete Task =====
    const handleDelete = async (id) => {
        try {
            await deleteTodoAPI(id);
            loadTodos();
        } catch (err) {
            setMessage('Failed to delete task.');
        }
    };

    return (
        <div className="todo-container">
            <div className="todo-header">
                <h2 className="todo-title">📝 My Tasks</h2>
                <button className="btn btn-secondary btn-sm" onClick={onLogout}>Logout</button>
            </div>

            <div className="card">
                {/* Error message */}
                {message && (
                    <div className="alert alert-error" style={{ marginBottom: '16px' }}>
                        {message}
                    </div>
                )}

                {/* Add task row */}
                <div className="add-task-row">
                    <input
                        className="add-task-input"
                        placeholder="Add a task... (max 140 characters)"
                        value={newTask}
                        onChange={e => setNewTask(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAdd()}
                    />
                    <span className={`char-count ${newTask.length > 140 ? 'over' : ''}`}>
                        {newTask.length}/140
                    </span>
                    <button className="btn btn-primary btn-sm" onClick={handleAdd}>Add</button>
                </div>

                {/* Todo items */}
                {todos.map(todo => (
                    <div key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
                        {/* Completion checkbox */}
                        <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => handleToggle(todo)}
                        />

                        {/* Show task text or edit input */}
                        {editId === todo.id ? (
                            <>
                                <input
                                    className="edit-input"
                                    value={editText}
                                    onChange={e => setEditText(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleEdit(todo.id)}
                                />
                                <div className="todo-actions">
                                    <button className="btn btn-primary btn-sm" onClick={() => handleEdit(todo.id)}>Save</button>
                                    <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}>Cancel</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <span className={`todo-text ${todo.done ? 'done' : ''}`}>
                                    {todo.task}
                                </span>
                                <div className="todo-actions">
                                    <button className="btn btn-secondary btn-sm" onClick={() => {
                                        setEditId(todo.id);
                                        setEditText(todo.task);
                                    }}>✏️</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(todo.id)}>🗑️</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}

                {todos.length === 0 && (
                    <div className="empty-state">
                        No tasks yet. Add one above!
                    </div>
                )}
            </div>
        </div>
    );
}

export default TodoList;
