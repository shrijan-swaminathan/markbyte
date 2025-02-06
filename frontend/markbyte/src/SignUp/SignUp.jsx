import React, { useState } from 'react';
import './Signup.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaLock } from 'react-icons/fa';
import { useAuth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const error = false;
    const handleSignUp = () => {
        console.log('Username:', username);
        console.log('Password:', password);
        axios.post('http://localhost:8080/signup', {
            username: username,
            password: password
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(function (response) {
            console.log(response);
            axios.post('http://localhost:8080/login', {
                username: username,
                password: password
              }, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then(function (response) {
                login(response.data.token, { name: username });
                navigate('/');
              })
              .catch(function (error) { 
                console.log(error);
              });
            })
          .catch(function (error) {
            console.log(error);
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        handleSignUp();
        setUsername('');
        setPassword('');
    }
    return (
        <div className="SignUp">
            <Link to="/">
                <img src="src/assets/MarkByte Logo.jpg" alt="Logo" className="page-logo" />
            </Link>
            <div className="signup-container">
                <div className="signup-box">
                    <h2>Sign Up</h2>
                    <form className="signup-form" onSubmit={handleSubmit}>
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
                        <button type="submit">Sign Up</button>
                    </form>
                    <p className="login-link">Already have an acccount? <a href="/login">Log in</a></p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
