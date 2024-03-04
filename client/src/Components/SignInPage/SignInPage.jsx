import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignInPage.css';

// This page should be completed by Adam

// This page should have the following:
// - Instead of having three different buttons for signing in as a passenger, employee, or admin, we should have a single form for signing in
// - Make sure the form:
//      1. have two input fields: email and password
//      2. is able to validate the user's credentials
//      3. have a submit button
// - The form should have following links:
//      1. to the sign-up page if a user doesn't have an account (only for passengers)
//      2. to the forgot password page if the user forgot their password
//      3. to the contact page if the user is having trouble signing in
//      4. to the admin dashboard if the user is an admin
//      5. to the user dashboard if the user is a passenger
//      6. to the employee dashboard if the user is an employee

// Styling for this page should be on the SignInPage.css file

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
