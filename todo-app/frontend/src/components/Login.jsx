// frontend/src/components/Login.jsx
import { useState } from 'react';
import { loginAPI } from '../api/api';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            const res = await loginAPI(username, password);
            onLogin(res.data.token); // pass token back to App.jsx
        } catch (err) {
            setMessage(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    // Allow submitting with the Enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleLogin();
    };

    return (
        <div>
            <div className="form-group">
                <label className="form-label">Email</label>
                <input
                    className="form-input"
                    placeholder="username@gmail.com"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Password</label>
                <input
                    className="form-input"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <button className="btn btn-primary" onClick={handleLogin}>Sign In</button>

            {message && <p className="alert alert-error">{message}</p>}
        </div>
    );
}

export default Login;
