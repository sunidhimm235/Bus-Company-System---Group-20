// BusDetailsModal.js
import React from 'react';
import './BusScheduleModal.css';

const BusDetailsModal = ({ bus, onClose }) => {
    if (!bus) return null; // If no bus is passed, don't render anything

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-header">
                    <h2>{bus.busName} - {bus.busNumber}</h2>
                    <button onClick={onClose}>&times;</button> {/* Close button */}
                </div>
                <div className="modal-body">
                    {/* Display all the bus details here */}
                    <p>Seats Available: {bus.seatAvailable}</p>
                    <p>Duration: {bus.duration}</p>
                    <p>Departure Time: {bus.departureTime}</p>
                    <p>Arrival Time: {bus.arrivalTime}</p>

                    {/* Add other details as you like */}
                </div>
                
                <div className="modal-footer">
                    <div className="modal-footer-prices">
                        <p>Starting Price: <strong style={{color:'var(--HoverColor)'}}>${bus.economyPrice}</strong></p>
                        <button>Book Now</button>
                        <p>Premium Price: <strong style={{color:'var(--HoverColor)'}}>${bus.premiumPrice}</strong></p>
                        <button>Book Now</button>
                        <p>Business Price: <strong style={{color:'var(--HoverColor)'}}>${bus.businessPrice}</strong></p>
                        <button>Book Now</button>
                    </div>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default BusDetailsModal;
  