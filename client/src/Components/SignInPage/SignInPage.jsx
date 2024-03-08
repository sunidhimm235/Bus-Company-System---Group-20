import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignInPage.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:4000/auth/login', { email, password });
      localStorage.setItem('token', data.token);

      switch (data.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'employee':
          navigate('/employee');
          break;
        default:
          navigate('/user'); // defaulting to user dashboard
      }
    } 
    catch (error) {
      console.error('Error signing in:', error.response.data.message);

    }
  };

  return (
    <div className="signin-container" style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" style={{ padding: '10px', width: '100%', cursor: 'pointer' }}>Sign In</button>
      </form>
      <div style={{ marginTop: '10px' }}>
        <a href="/sign-up">Don't have an account? Sign up</a><br />
        <a href="/forgot-password">Forgot password?</a><br />
        <a href="/contact">Having trouble signing in?</a>
      </div>
    </div>
  );
};

export default SignInPage;