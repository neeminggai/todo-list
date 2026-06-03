// frontend/src/App.jsx
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [page, setPage] = useState('login'); // 'login' | 'register'

    const handleLogin = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    // If token exists, show the TodoList
    if (token) {
        return <TodoList onLogout={handleLogout} />;
    }

    // No token — show Login or Register page
    return (
        <div className="auth-container">
            <div className="card">
                <h1 className="auth-title">📝 Todo App</h1>

                <div className="auth-tabs">
                    <button
                        className={`tab-btn ${page === 'login' ? 'active' : ''}`}
                        onClick={() => setPage('login')}
                    >
                        Sign In
                    </button>
                    <button
                        className={`tab-btn ${page === 'register' ? 'active' : ''}`}
                        onClick={() => setPage('register')}
                    >
                        Register
                    </button>
                </div>

                {page === 'login'
                    ? <Login onLogin={handleLogin} />
                    : <Register onSuccess={() => setPage('login')} />
                }
            </div>
        </div>
    );
}

export default App;
