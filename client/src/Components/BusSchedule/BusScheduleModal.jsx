// BusDetailsModal.js
import React from 'react';
import './BusScheduleModal.css';

const BusDetailsModal = ({ bus, onClose }) => {
    if (!bus) return null;

    const features = {
        economy: ['Wifi', 'Snack'],
        premium: ['Wifi', 'Snack', 'Extra legroom'],
        business: ['Wifi', 'Snack', 'Extra legroom', 'Complimentary drinks']
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-header">
                    <h2>{bus.busName} - {bus.busNumber}</h2>
                </div>
                <div className="modal-body">
                    <h3>Classes & Features</h3>
                    <div className="modal-scroll">
                        <div className="card">
                            <h4>Economy Class</h4>
                            <p>Price: ${bus.economyPrice}</p>
                            <p>Seats Available: {bus.seatAvailable}</p>
                            <p>Duration: {bus.duration}</p>
                            <ul>
                                {features.economy.map((feature, index) => <li key={index}>{feature}</li>)}
                            </ul>
                            <button>Book Now</button>
                        </div>
                        <div className="card">
                            <h4>Premium Class</h4>
                            <p>Price: ${bus.premiumPrice}</p>
                            <ul>
                                {features.premium.map((feature, index) => <li key={index}>{feature}</li>)}
                            </ul>
                            <button>Book Now</button>
                        </div>
                        <div className="card">
                            <h4>Business Class</h4>
                            <p>Price: ${bus.businessPrice}</p>
                            <ul>
                                {features.business.map((feature, index) => <li key={index}>{feature}</li>)}
                            </ul>
                            <button>Book Now</button>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default BusDetailsModal;
