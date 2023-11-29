// RegistrationForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/register', { username, password });

      if (response && response.data) {
        console.log('Registration successful');
        // Redirect to the login page after successful registration.
        navigate('/login');
      } else {
        console.error('Response or data is undefined.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Registration failed:', error.response.data.error);
      } else {
        console.error('Registration failed:', error.message);
      }
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form className="registration-form">
        <label>
          Username:
          <input
            className="registration-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            className="registration-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button className="registration-button" type="button" onClick={handleRegister}>
          Register
        </button>
      </form>

      {/* Link to login page */}
      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default RegistrationForm;
