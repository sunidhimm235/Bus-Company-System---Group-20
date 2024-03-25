import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSadTear } from 'react-icons/fa';
import './BusSchedule.css';
import BusDetailsModal from './BusScheduleModal.jsx';
import { isAuthenticated } from '../../utils/auth.js';

const BusSchedule = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { from, to, date } = location.state || { from: '', to: '', date: new Date() };

    const [selectedBusNames, setSelectedBusNames] = useState(new Set());
    const [selectedDay, setSelectedDay] = useState(new Date(date));
    const [selectedBusForDetails, setSelectedBusForDetails] = useState(null);
    const [busRoutes, setBusRoutes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/buses/${from}/${to}`);
                setBusRoutes(response.data);
            } 
			catch (error) {
                console.error('Error fetching bus routes:', error);
            }
        };

        if (from && to) fetchData();
    }, [from, to]);

    const toggleBusNameFilter = (busName) => {
        setSelectedBusNames((prevSelectedBusNames) => {
            const newSelectedBusNames = new Set(prevSelectedBusNames);
            if (newSelectedBusNames.has(busName)) {
                newSelectedBusNames.delete(busName);
            } else {
                newSelectedBusNames.add(busName);
            }
            return newSelectedBusNames;
        });
    };

    const displayedBuses = busRoutes.filter(bus =>
        (selectedBusNames.size === 0 || selectedBusNames.has(bus.busName)) &&
        bus.day === selectedDay.toLocaleDateString('en-US', { weekday: 'long' })
    );

    const next7Days = Array.from({ length: 7 }, (_, i) => new Date(date).setDate(date.getDate() + i));

    const showBusDetails = (bus) => {
        if (isAuthenticated()) {
            navigate('/seat-selection', { state: { bus } });
        } 
		else {
            navigate('/sign-in', { state: { from: '/seat-selection', bus } });
        }
    };

    return (
        <div className='bus-schedule'>
            <div className='bus-schedule-content'>
                <div className='bus-schedule-header'>
                    <h1>Bus Schedule</h1>
                    <p>Showing bus schedule from {from} to {to} on {date ? new Date(date).toLocaleDateString() : ''}</p>
                </div>
                <div className='bus-schedule-list'>
                    <div className='bus-schedule-filter'>
                        <h2>Filter by bus:</h2>
                        <div className='bus-schedule-filter-list'>
                            {[...new Set(busRoutes.map(bus => bus.busName))].map((busName, index) => (
                                <div key={index} className='bus-schedule-filter-item'>
                                    <input
                                        type='checkbox'
                                        id={busName}
                                        checked={selectedBusNames.has(busName)}
                                        onChange={() => toggleBusNameFilter(busName)}
                                    />
                                    <label htmlFor={busName}>{busName}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='bus-schedule-table'>
                        <div className='bus-schedule-days'>
                            {next7Days.map((day, index) => {
                                const dayObj = new Date(day);
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedDay(dayObj)}
                                        className={dayObj.toLocaleDateString() === selectedDay.toLocaleDateString() ? 'active' : ''}
                                    >
                                        {dayObj.toLocaleDateString('en-US', { weekday: 'long' })}
                                    </button>
                                );
                            })}
                        </div>
                        <div className='bus-schedule-table-ticket'>
                            {displayedBuses.length === 0 ? (
                                <h2 className='no-buses'>Sorry <FaSadTear />, No buses available on this day</h2>
                            ) : (
                                displayedBuses.map((bus, index) => (
                                    <div key={index} className='bus-schedule-ticket'>
                                        <div className='bus-schedule-ticket-header'>
                                            <h2>{bus.busName}</h2>
                                            <h4>({bus.from} to {bus.to})</h4>
                                        </div>
                                        <div className='bus-schedule-ticket-info'>
                                            <p>Bus Number: {bus.busNumber}</p>
                                            <p>Duration: {bus.duration}</p>
                                            <p>Departure Time: {bus.departureTime}</p>
                                            <p>Arrival Time: {bus.arrivalTime}</p>
                                            <p>Seats Available: {
                                                bus.economySeats.filter(seat => seat.isAvailable).length +
                                                bus.premiumSeats.filter(seat => seat.isAvailable).length +
                                                bus.businessSeats.filter(seat => seat.isAvailable).length
                                            }</p>
                                            <p>Starting Price: <strong style={{color: 'var(--HoverColor)'}}>${bus.economyPrice}</strong></p>
                                        </div>
                                        <div className='bus-schedule-ticket-details'>
                                            <button onClick={() => showBusDetails(bus)}>See Details</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {selectedBusForDetails && <BusDetailsModal bus={selectedBusForDetails} onClose={() => setSelectedBusForDetails(null)} />}
        </div>
    );
};

export default BusSchedule;