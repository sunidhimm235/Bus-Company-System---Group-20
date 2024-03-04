import React, { useState } from 'react';
import './SignUpPage.css';

// This page should be completed by Adam

// This page should have the following:
// - A form to sign up and it should have:
//      1. four input fields: name, email, password, and confirm password
//      2. a submit button
//      3. a link to the sign-in page if the user already has an account
//      4. a link to the contact page if the user is having trouble signing up
//      5. be able to validate the user's input
//      6. be able to create a new user account in the database
//      7. be able to redirect the user to the user dashboard after successful sign-up if the user is signing from the user sign up link
//      8. or be able to direct back to the ticket booking page if the user is signing from the ticket booking page

// Styling for this page should be on the SignUpPage.css file

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you would typically handle the sign-up by validating the input
    // (e.g., checking if the password and confirm password match)
    // and then calling a service to create a new user account.
    console.log('Name:', name, 'Email:', email, 'Password:', password, 'Confirm Password:', confirmPassword);
    // Reset form or redirect user after successful sign-up.
  };

  return (
    <div className="signup-container" style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '10px 0' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <button type="submit" style={{ padding: '10px', width: '100%', cursor: 'pointer' }}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
