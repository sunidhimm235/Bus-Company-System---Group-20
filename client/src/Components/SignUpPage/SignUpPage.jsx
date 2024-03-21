import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css'; 

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      await axios.post('http://localhost:4000/auth/register', { username, email, password });
      navigate('/login');
    } 
    catch (error) {
      setErrorMessage(error.response.data.message || 'Error signing up');
    }
  };

  return (
    <div className="signup-container" style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Sign Up</h2>
      {errorMessage && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '10px 0' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label htmlFor="confirm-password" style={{ display: 'block', marginBottom: '5px' }}>Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', width: '100%', cursor: 'pointer', marginTop: '10px' }}>Sign Up</button>
      </form>
      <div style={{ marginTop: '10px' }}>
        <a href="/sign-in">Already have an account? Sign in</a><br />
        <a href="/contact">Having trouble signing up?</a>
      </div>
    </div>
  );
};

export default SignUpPage;