// BusDetailsModal.js
import React from 'react';
import './BusScheduleModal.css';
import { FaWifi, FaUtensils, FaCouch, FaGlassMartiniAlt, FaSuitcase } from 'react-icons/fa';

const BusDetailsModal = ({ bus, onClose }) => {
    if (!bus) return null;

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
                            <p>Seats Available: 20</p>
                            <ul>
                                <li>Features:</li>
                                <li><FaSuitcase /> One bag allowed</li>
                                <li><FaWifi /> Wifi</li>
                                <li><FaUtensils /> Snack</li>
                            </ul>
                            <button>Book Now</button>
                        </div>
                        <div className="card">
                            <h4>Premium Class</h4>
                            <p>Price: <strong>${bus.premiumPrice}</strong></p>
                            <p>Seats Available: 10</p>
                            <ul>
                                <li>Features:</li>
                                <li><FaSuitcase /> Two bags allowed</li>
                                <li><FaWifi /> Wifi</li>
                                <li><FaUtensils /> Snack</li>
                                <li><FaCouch /> Extra legroom</li>
                            </ul>
                            <button>Book Now</button>
                        </div>
                        <div className="card">
                            <h4>Business Class</h4>
                            <p>Price: <strong>${bus.businessPrice}</strong></p>
                            <p>Seats Available: 10</p>
                            <ul>
                                <li>Features:</li>
                                <li><FaSuitcase /> Three bags allowed</li>
                                <li><FaWifi /> Wifi</li>
                                <li><FaUtensils /> Snack</li>
                                <li><FaCouch /> Extra legroom</li>
                                <li><FaGlassMartiniAlt /> Complimentary drinks</li>
                            </ul>
                            <button className=''>Book Now</button>
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
