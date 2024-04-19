import React, { useState } from 'react';
import './HowTo.css'

import signUp from './images/SignUp.png';
import signIn from './images/SignIn.png';
import dest from './images/Destination.png';
import cancel from './images/Reservation.png';
import busFind from './images/FindBus.png';
import busList from './images/BusList.png';
import confirm from './images/Confirm.png';


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
          <p>To sign in, first, navigate to the login page. Then enter the email address associated with your account into the designated field. Then, input your password into the password field. Ensure your password is entered accurately, paying attention to uppercase and lowercase letters as passwords are case-sensitive. Once both fields are completed, review the information for accuracy, then click the "Sign In" button to access your account.</p>
        </div>
      )
    },
    {
      title: 'How to Find a Bus',
      content: (
        <div>
          <img src={busFind} alt={''} className="accordion-image" />
          <p>To reserve a seat on a bus, begin by logging into your account on the bus reservation platform. After logging in, navigate to the homepage by selecting "Home" from the Navbar. Once on the homepage, find booking widget. Enter the departure and arrival locations as well as the date of your journey into the designated fields. After inputting this information, click on the "Search" button to proceed. This action will prompt the system to display available bus options based on your specified criteria.</p>
        </div>
      )
    },
    {
      title: 'How Reserve a Seat on a Bus',
      content: (
        <div>
          <img src={busList} alt={''} className="accordion-image" />
          <img src={confirm} alt={''} className="accordion-image" />
          <p>To reserve a seat on a bus, begin by utilizing the "How to Find a Bus" feature on the bus reservation website or app. Once you've found a suitable bus, click on "See Details" to view more information about the specific trip. Within the details page, click on the seat you desire, and then on the button labeled "Book Now" to proceed with the reservation. You'll then be directed to the transaction page where you can review the booking details. Confirm that all the information is accurate, such as the departure time, seat selection, and pricing. Once verified, click on "Complete Transaction" to finalize your reservation.</p>
        </div>
      )
    },
    {
      title: 'How to Cancel your Reservation',
      content: (
        <div>
          <img src={cancel} alt={''} className="accordion-image" />
          <p>To cancel a bus reservation, start by logging into your account on the bus reservation website or app. Once logged in, locate and click on your username, usually found in the top right corner of the page. This will typically open a dropdown menu or direct you to your account settings. From there, navigate to the reservation page, which might be labeled as "My Reservations" or something similar. Once you're on the reservation page, scroll or search to find the specific reservation you wish to cancel. Depending on the interface, there should be an option or button associated with that reservation indicating "Cancel". Click on it, and a confirmation message or dialog box should appear asking if you're sure you want to cancel. Finally, click "OK" to complete the cancellation process.</p>
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