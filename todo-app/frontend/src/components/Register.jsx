// frontend/src/components/Register.jsx
import { useState } from 'react';
import { registerAPI } from '../api/api';

function Register({ onSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            await registerAPI(username, password);
            setMessage('Registration successful! Please sign in.');
            onSuccess(); // go back to the login page
        } catch (err) {
            setMessage(err.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    // Allow submitting with the Enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleRegister();
    };

    return (
        <div>
            <div className="alert alert-warning">
                ⚠️ Username must end with @gmail.com
            </div>

            <div className="form-group" style={{ marginTop: '16px' }}>
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
                    placeholder="Create a password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <button className="btn btn-primary" onClick={handleRegister}>Create Account</button>

            {message && <p className="alert alert-error">{message}</p>}
        </div>
    );
}

export default Register;
