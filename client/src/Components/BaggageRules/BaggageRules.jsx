import React from 'react';
import './BaggageRules.css';

const BaggageRules = () => {
  return (
    <div className="baggage-rules-container">
      <h1>Your TicketRide Baggage Policy</h1>
      <p>Your TicketRide ticket includes FREE baggage transportation, as detailed below:</p>
      <div className="rule-item">
        <h3>1 Carry-On Bag</h3>
        <ul>
          <li>Store under your seat or in the overhead baggage compartment above your seat.</li>
          <li>Maximum dimensions: 22 inches x 14 inches x 9 inches (56 cm x 36 cm x 23 cm).</li>
        </ul>
      </div>
      <div className="rule-item">
        <h3>1 Stored Bag</h3>
        <ul>
          <li>Store in the baggage compartment before you enter the bus.</li>
          <li>Maximum dimensions: 62 linear inches (length + width + height).</li>
          <li>Maximum weight: 50 pounds (23 kg).</li>
        </ul>
      </div>
      <p>Please ensure your name and contact information are clearly labeled on your bag (both on the outside and inside).</p>

      <h2>Baggage Guidelines</h2>
      <p>To prevent damage or loss, it's essential to securely pack your belongings. Here are some recommended and not recommended items for your stored baggage:</p>
      <div className="rule-item">
        <h3>Recommended</h3>
        <ul>
          <li>Suitcases</li>
          <li>Backpacks</li>
          <li>Duffel bags</li>
          <li>Trunks</li>
          <li>Toolboxes</li>
          <li>Securely tied cardboard boxes</li>
        </ul>
      </div>
      <div className="rule-item">
        <h3>Not Recommended</h3>
        <ul>
          <li>Plastic bags</li>
          <li>Paper bags</li>
          <li>Items protruding from your baggage</li>
        </ul>
      </div>
      <p>For a comprehensive list of items permitted in your carry-on or stored baggage, we invite you to fill out our contact form. By doing so, you'll gain access to a detailed inventory of approved items tailored to ensure your journey is seamless and compliant with our guidelines.</p>
      <h2>Baggage Responsibilities</h2>
      <p>As a valued passenger, it is paramount that you take responsibility for collecting your baggage upon reaching your final destination or during transfers. Remember to retrieve your belongings and ensure they accompany you to your next bus, if applicable.</p>
      <h2>Storing Baggage</h2>
      <p>When your boarding schedule is announced, please take care to load your stored baggage onto the bus. Keep a keen eye on its placement, as you are accountable for its retrieval and, if necessary, its seamless transfer to your next bus. Should you require any assistance with your baggage, please do not hesitate to inform us.</p>
      <h2>Lost Baggage</h2>
      <p>While we tirelessly strive to aid in the recovery of lost items, TicketRide must, regrettably, disclaim liability for any lost or damaged baggage. However, should you misplace your bag and wish for our assistance in locating it, we encourage you to reach out to us through our dedicated support page or by contacting our 24/7 helpline. Rest assured, if we successfully locate your baggage, arrangements will promptly be made for its safe return to you.</p>
    </div>
  );
};

export default BaggageRules;