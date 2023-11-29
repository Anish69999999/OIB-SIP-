// LoginForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Import your CSS file

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      console.log('Attempting to log in...');
      const response = await axios.post('http://localhost:3001/api/login', { username, password });

      
      if (response && response.data) {
        console.log('Login successful');
      
        navigate('/secured-page'); // Navigate to the secured page
      } else {
        console.error('Response or data is undefined.');
      }
    } catch (error) {
      // Check if 'response' is defined before accessing 'response.data'
      if (error.response && error.response.data) {
        console.error('Login failed:', error.response.data.error);
        setLoginError(error.response.data.error); // Set the login error message
      } else {
        console.error('Login failed:', error.message);
        setLoginError('An unexpected error occurred during login.'); // Set a generic error message
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label>
          Username:
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>

      {loginError && <p className="login-error">{loginError}</p>}
    </div>
  );
};

export default LoginForm;
