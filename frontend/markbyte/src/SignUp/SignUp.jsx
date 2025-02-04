import React, { useState } from 'react';
import './Signup.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                        <input type="text" value = {username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                        <input type="password" value = {password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <button type="submit">Sign Up</button>
                    </form>
                    <p className="login-link">Already have an acccount? <a href="/login">Log in</a></p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
