import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ContactPage.css'
import Navbar from './/../NavBar/Navbar.jsx'; 
import Footer from './/../Footer/Footer.jsx'; 
import CityMap from '../../assets/CityMap.png';

const ContactPage = (props) => {
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const mess =  {Name, email, phone, message}
    console.log(mess)
    setErrorMessage('Error not fully implemented yet');
    /*
    try {
      await axios.post('http://localhost:4000/contactRoutes/createRoute', {fName, lName, email, phone, message});
      navigate('/home');
    } catch (error) {
      setErrorMessage(error.response.data.message || 'Error contacting support');
    }
            style={{ backgroundImage: `url(${CityMap})` }}

    */
    
  };

  return (
    <div>
      <Navbar />
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
                value={Name}
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
      <Footer />
    </div>
  )
}

export default ContactPage
