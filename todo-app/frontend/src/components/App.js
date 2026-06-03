// frontend/src/App.js
import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import TodoList from './TodoList';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [page, setPage] = useState('login');

    const handleLogin = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    if (token) {
        return <TodoList onLogout={handleLogout} />;
    }

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
            <h1>📝 Todo App</h1>

            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={() => setPage('login')}
                    style={{
                        marginRight: '10px',
                        padding: '8px 16px',
                        background: page === 'login' ? '#4CAF50' : '#ddd',
                        color: page === 'login' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Login
                </button>
                <button
                    onClick={() => setPage('register')}
                    style={{
                        padding: '8px 16px',
                        background: page === 'register' ? '#4CAF50' : '#ddd',
                        color: page === 'register' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Register
                </button>
            </div>

            {page === 'login'
                ? <Login onLogin={handleLogin} />
                : <Register onSuccess={() => setPage('login')} />
            }
        </div>
    );
}

export default App;