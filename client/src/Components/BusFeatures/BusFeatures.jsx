import React from 'react';
import './BusFeatures.css';
import Navbar from './/../NavBar/Navbar.jsx'; 

const BusFeatures = () => {
  return (
    <div>
    <Navbar />
    <div className="bus-features-container">
      <h1>Bus Features</h1>
      <div className="feature-item">
        <h3>Outside the Bus</h3>
        <ul>
        <li><strong>Eco-friendly engines:</strong> Each TicketRide bus is equipped with state-of-the-art technology to ensure clean fuel combustion, thereby minimizing our environmental footprint. Learn more about our eco-efforts and technological advancements by filling out our contact form for further details.</li>
        <li><strong>Under-bus baggage compartment:</strong> You can conveniently store up to three bags beneath the bus, with the first bag being complimentary. Fill out our contact form to explore further details about our baggage allowances.</li>
        <li><strong>Outstanding safety record:</strong> TicketRide has consistently received the highest safety ratings from the Department of Transportation for over a decade. Learn more about our comprehensive training programs and safety protocols by filling out our contact form for additional information.</li>
        <li><strong>Wheelchair lift:</strong> For passengers with mobility challenges, all our buses are equipped with wheelchair lifts to facilitate boarding. Fill out our contact form to discover more about our commitment to assisting customers with disabilities.</li>
        </ul>
      </div>
      <div className="feature-item">
        <h3>Inside the Bus</h3>
        <ul>
        <li><strong>Wheelchair space:</strong> Each TicketRide bus features dedicated space to accommodate two passengers traveling in wheelchairs or mobility scooters. Seats are removed to ensure ample room for accessibility. Learn about our efforts to accommodate passengers with disabilities by filling out our contact form for further details.</li>
        <li><strong>Air conditioning:</strong> Our buses are equipped with efficient air conditioning systems to maintain a comfortable interior temperature. Additionally, individual air outlets at each seat allow you to customize your comfort.</li>
        <li><strong>Overhead storage:</strong> Maximize space around your seat by utilizing the overhead storage compartments for your carry-on baggage.</li>
        <li><strong>Choose your seat:</strong> When booking your ticket, you have the option to select your preferred seat for an enhanced travel experience. While all customers are assigned a seat, choosing your seat allows for personalized comfort. Seat reservation fees vary by route; fill out our contact form to inquire about pricing details.</li>
        <li><strong>On-board restroom:</strong> While we do make rest stops during the journey, onboard restrooms provide added convenience for passengers.</li>
        </ul>
      </div>
      <div className="feature-item">
        <h3>At Your Seat</h3>
        <ul>
        <li><strong>Individual power outlets:</strong> Nearly every seat is equipped with its own standard power outlet, ensuring you can keep your devices charged throughout your journey.</li>
        <li><strong>Extra legroom:</strong> Our redesigned buses prioritize passenger comfort, with a focus on providing ample legroom. Say goodbye to cramped quarters and enjoy the space to stretch out during your TicketRide journey.</li>
        <li><strong>Free Wi-Fi:</strong> Stay connected throughout your journey with complimentary Wi-Fi available to all passengers. Whether you're checking emails or sharing scenic snapshots on social media, our Wi-Fi ensures you're always connected. Please be considerate of bandwidth usage and refrain from streaming videos during your journey.</li>
        <li><strong>Reclining leather seats:</strong> Sink into our plush leather seats, which are not only adjustable but also feature convenient footrests for added relaxation. Once you're settled, drift off into a comfortable journey, counting sheep if you wish.</li>
        <li><strong>3-point safety belts:</strong> Safety is our top priority. That's why all our new buses are equipped with three-point safety belts, featuring both shoulder and lap harnesses. These belts are compatible with standard car child seats, ensuring a secure ride for all passengers.</li>
        <li><strong>No middle seats:</strong> Enjoy the luxury of either a window or aisle seat on TicketRide buses. With no middle seats, there's no need to worry about feeling cramped or having to negotiate for armrest space.</li>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default BusFeatures;