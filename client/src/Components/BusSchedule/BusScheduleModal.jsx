// BusDetailsModal.js
import React from 'react';
import './BusScheduleModal.css';
import { FaWifi, FaUtensils, FaCouch, FaGlassMartiniAlt, FaSuitcase } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BusDetailsModal = ({ bus, onClose }) => {

    const navigate = useNavigate();
    if (!bus) return null;
    
    // Counts economy seats that are available
    const availableEconomySeats = bus.economySeats.filter(seat => seat.isAvailable).length;

    // Counts premium seats that are available
    const availablePremiumSeats = bus.premiumSeats.filter(seat => seat.isAvailable).length;

    // Counts business seats that are available
    const availableBusinessSeats = bus.businessSeats.filter(seat => seat.isAvailable).length;

    // Handles the click event for the Book Now button
    const handleBookNowClickE = () => {
        const type = 'economy';
        navigate('/seat-selection', { state: { bus, type } });
    };  

    const handleBookNowClickP = () => {
        const type = 'premium';
        navigate('/seat-selection', { state: { bus, type } });
    }

    const handleBookNowClickB = () => {
        const type = 'business';
        navigate('/seat-selection', { state: { bus, type } });
    }

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
                            <p>Price: <strong>${bus.economyPrice}</strong></p>
                            <p>Seats Available: {availableEconomySeats}</p>
                            <ul>
                                <li>Features:</li>
                                <li><FaSuitcase /> One bag allowed</li>
                                <li><FaWifi /> Wifi</li>
                                <li><FaUtensils /> Snack</li>
                            </ul>
                            <button onClick={handleBookNowClickE}>Book Now</button>
                        </div>
                        <div className="card">
                            <h4>Premium Class</h4>
                            <p>Price: <strong>${bus.premiumPrice}</strong></p>
                            <p>Seats Available: {availablePremiumSeats}</p>
                            <ul>
                                <li>Features:</li>
                                <li><FaSuitcase /> Two bags allowed</li>
                                <li><FaWifi /> Wifi</li>
                                <li><FaUtensils /> Snack</li>
                                <li><FaCouch /> Extra legroom</li>
                            </ul>
                            <button onClick={handleBookNowClickP}>Book Now</button>
                        </div>
                        <div className="card">
                            <h4>Business Class</h4>
                            <p>Price: <strong>${bus.businessPrice}</strong></p>
                            <p>Seats Available: {availableBusinessSeats}</p>
                            <ul>
                                <li>Features:</li>
                                <li><FaSuitcase /> Three bags allowed</li>
                                <li><FaWifi /> Wifi</li>
                                <li><FaUtensils /> Snack</li>
                                <li><FaCouch /> Extra legroom</li>
                                <li><FaGlassMartiniAlt /> Complimentary drinks</li>
                            </ul>
                            <button onClick={handleBookNowClickB}>Book Now</button>
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
