import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { CiWarning } from "react-icons/ci";
import axios from 'axios';
import { useAuth } from '../AuthContext/AuthContext'
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
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
            // if (response.)
            login(response.data.token, { name: username });
            navigate('/');
          })
          .catch(function (error) {
            setErrorMsg('Login failed. Please try again.');
            // Clear the error message after 10 seconds
            setTimeout(() => {
            setErrorMsg('');
            }, 3000);
          })
        
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
                    {errorMsg && <div className="error-message"><CiWarning />{errorMsg}</div>}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="input-container">
                            <FaUser className="icon" />
                            <input 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                placeholder="Username" 
                                required
                            />
                        </div>

                        <div className="input-container">
                            <FaLock className="icon" />
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Password" 
                                required
                            />
                        </div>

                        <button type="submit">Login</button>
                    </form>
                    <p className="signup-link">Don't have an account? <a href="/signup">Sign up</a></p>
                </div>
            </div>

        </div>
    );
}

export default Login;
