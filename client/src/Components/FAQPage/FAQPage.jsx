import React, {useState} from 'react'
import './FAQPage.css'

const FAQPage = (props) => 
{
  const [openAccordions, setOpenAccordions] = useState([]); // All accordions open by default

  const faqData = [
    {
      question: 'Q. How early should I arrive before departure?',
      answer: 'A. We recommend arriving at least 30 minutes before the scheduled departure time to allow enough time for boarding and any necessary procedures.',
    },
    {
      question: 'Q. How can I book a ticket?',
      answer: 'A. Easily book your tickets through our user-friendly website by choosing your destination, travel date, and preferred time.',
    },
    {
      question: 'Q. How can I cancel a ticket?',
      answer: 'A. Easily cancel your tickets through our website.',
    },
    {
      question: 'Q. What is your luggage policy?',
      answer: 'A. Each passenger is allowed one carry-on bag and one checked bag free of charge. Additional baggage may incur extra fees.',
    },
    {
      question: 'Q. What payment methods do you accept?',
      answer: 'A. We accept all major credit cards (Visa, Mastercard, American Express, Discover), as well as PayPal and Apple Pay.',
    },
    {
      question: 'Q. Are pets allowed on board?',
      answer: 'A. We are happy to inform you that pets are allowed on board.',
    },
    {
      question: 'Q. What are your safety measures amid COVID-19?',
      answer: 'A. We have implemented various safety measures in accordance with local health guidelines, including mandatory mask-wearing, regular sanitization of buses, and limited seating capacity to ensure social distancing.',
    },
    {
      question: 'Q. Can I get a refund if I cancel my ticket?',
      answer: 'A. Refund policies vary depending on the type of ticket and the timing of the cancellation. Please contact our customer service team for any questions or concerns.',
    },
    {
      question: 'Q. Do you offer Wi-Fi on your buses?',
      answer: 'A. Yes, we provide complimentary Wi-Fi on board our buses, allowing you to stay connected during your journey.',
    },
  ];

  const toggleAccordion = (index) => {
    setOpenAccordions((prevOpenAccordions) => {
      if (prevOpenAccordions.includes(index)) {
        return prevOpenAccordions.filter((i) => i !== index);
      } else {
        return [...prevOpenAccordions, index];
      }
    });
  };

  return (
    <div className="background-container">
      <div className="faq-page-container">
        <h1 className="faq-page-text">Frequently Asked Questions</h1>
        <div className="accordion-container">
          {faqData.map((item, index) => (
          <div
            key={index}
            className={`accordion-item ${openAccordions.includes(index) ? 'open' : ''}`}
          >
            <div className="accordion-header" onClick={() => toggleAccordion(index)}>
              <h3>{item.question}</h3>
            </div>
            <div className="accordion-content">{item.answer}</div>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQPage