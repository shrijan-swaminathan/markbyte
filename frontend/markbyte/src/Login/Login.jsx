import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = () => {
        axios.post('http://localhost:8080/login', {
            username: username,
            password: password
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(function (response) {
            console.log("JWT Token:", response.data.token);
            localStorage.setItem('token', response.data.token);
            navigate('/');
          })
          .catch(function (error) {
            console.log(error);
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
        setUsername('');
        setPassword('');
    }

    return (
        <div className="Login">
            <Link to="/">
                <img src="src/assets/MarkByte Logo.jpg" alt="Logo" className="page-logo" />
            </Link>
            <div className="login-container">
                <div className="login-box">
                    <h2>Login</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <button type="submit">Login</button>
                    </form>
                    <p className="signup-link">Don't have an account? <a href="/signup">Sign up</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
