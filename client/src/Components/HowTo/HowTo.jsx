import React, { useState } from 'react';
import './HowTo.css'

import signUp from './images/SignUp.png';
import signIn from './images/SignIn.png';
import dest from './images/Destination.png';


function HowToPage() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const accordions = [
    {
      title: 'How to Create an Account',
      content: (
        <div>
          <img src={signUp} alt={''} className="accordion-image" />
          <p>To create an account, begin by navigating to the sign up page. Then enter your desired username, ensuring it meets any specified criteria such as character length or allowed characters. Then, input your email address, ensuring it is valid and correctly formatted. Create a secure password, combining letters, numbers, and special characters for added security. Re-enter the password in the "confirm password" field to ensure accuracy. Once all fields are completed, review the information for accuracy, then click the "Sign Up" button to finalize the process.</p>
        </div>
      )
    },
    {
      title: 'How to Sign in to your Account',
      content: (
        <div>
          <img src={signIn} alt={''} className="accordion-image" />
          <p>To sign in, first, navigate to the login page. Then enter the email address associated with your account into the designated field. Then, input your password into the password field. Ensure your password is entered accurately, paying attention to uppercase and lowercase letters as passwords are often case-sensitive. Once both fields are completed, review the information for accuracy, then click the "Sign In" button to access your account.</p>
        </div>
      )
    },
    {
      title: 'How to See a list of Destinations',
      content: (
        <div>
          <img src={dest} alt={''} className="accordion-image" />
          <p>To explore the list of destinations, first, navigate to the destinations page. Upon arrival, you'll likely encounter a list of destinations presented in alphabetical order. To refine your search, locate the search bar typically positioned at the top of the page. Enter keywords related to your desired destination, such as city names, landmarks, or activities. As you type your search query, the results will be reduced down to the matching ones. Review the results displayed on the page, and click on any destination that interests you to access further details and information.</p>
        </div>
      )
    }
  ];

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
      <div className="how-to-page">
        <h1>How To Use This Website</h1>
        <div className="accordions">
          {accordions.map((accordion, index) => (
            <div
              key={index}
              className={`accordion ${activeAccordion === index ? 'active' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="accordion-header">
                <div className="accordion-title">{accordion.title}</div>
              </div>
              <div className="accordion-content">
                {accordion.content}
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default HowToPage;