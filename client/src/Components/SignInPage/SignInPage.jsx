import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you would typically handle the sign in,
    // e.g., by calling an authentication service.
    console.log('Email:', email, 'Password:', password);
    // Reset form or redirect user after successful sign in.
  };

  const handleAdminSignIn = () => {
    // Here, you would typically validate the admin credentials
    navigate('/admin'); // Navigate to the admin page
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
        <button type="submit" style={{ padding: '10px', width: '100%', cursor: 'pointer', marginBottom: '10px' }}>Sign In as Passenger</button>
        <button type="submit" style={{ padding: '10px', width: '100%', cursor: 'pointer', marginBottom: '10px' }}>Sign In as Employee</button>
        <button type="button" onClick={handleAdminSignIn} style={{ padding: '10px', width: '100%', cursor: 'pointer' }}>Sign In as Admin</button>
      </form>
    </div>
  );
};

export default SignInPage;
