import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ContactPage.css'

const ContactPage = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const contactData = { name, email, phone, message };
    console.log(contactData);
    try
     {
      await axios.post('http://localhost:4000/contact', contactData);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setErrorMessage('');
    } 
    catch (error) 
    {
      console.error('Error submitting contact form:', error);
      setErrorMessage('Error submitting the form. Please try again later.');
    }
  };

  return (
    <div>
      <div className='background'>
      </div>
      <div className="contact-page-container">
        <div className="contact-page-holder">
          <div className="contact-page-cp-message">
            <h1 className="contact-page-heading large-text">Get in Touch</h1>
              <div className="contact-info">
                <div>
                  <span>Looking to reach out to us? Feel free to give us a call, send an email, or fill out the contact form below.</span>
                </div>
                <div>
                  <span>---</span>
                </div>
                <div>
                  <span>+234 123 456 7890</span>
                </div>
                <div>
                  <span>contactUs@ticketride.com</span>
                </div>
            </div>
          </div>
          <div className="cp-form-container">
            {errorMessage && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
            <form className="contactForm" onSubmit={handleSubmit}>
              <span className="cp-name-text">Name</span>
              <input
                type="text"
                placeholder="Name"
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="cp-name-in"
              />
              <span className="cp-email-text">Email Address</span>
              <input
                type="text"
                placeholder="Email Address"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="cp-mail-in"
              />
              <span className="cp-phone-text">Phone Number</span>
              <input
                type="text"
                placeholder="XXX-XXX-XXXX"
                required={true}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="cp-phone-in"
              />
              <span className="cp-q-text"> How can we assist you today? </span>
              <textarea
                placeholder="Questions, Comments, Concerns"
                required={true}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="cp-q-in"
              ></textarea>
              <button type="submit" className="cp-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
