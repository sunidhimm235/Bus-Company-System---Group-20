import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './SeatSelection.css';

const SeatSelection = () =>
{
    // State variables
    const [loading, setLoading] = useState(true);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const { state } = useLocation();
    const navigate = useNavigate();

    // Prints the state data for debugging
    console.log(state);

    // Fetch bus data when the component mounts
    useEffect(() => {
    if (state?.bus) {
        setLoading(false);
    }
    }, [state]);

    // Loading message
    if (loading) {
        return <div>Loading seats...</div>;
    }

    // Handles the book now button click event
    const handleBookNow = async () => {
        if (selectedSeat) {
            // Update seat availability on the backend
            try {
                console.log('Bus ID:', state.bus._id);
                console.log('Seat ID:', selectedSeat._id);

                const response = await axios.patch(`http://localhost:4000/buses/${state.bus._id}/book-seat`, {
                    seatId: selectedSeat._id // Send the ID of the seat to be booked
                });
                console.log(response.data.message);
    
                // Navigate to the user information page, passing the bus and seat details
                // You need to set up routing and create this new page/component
                navigate('/user-information', { state: { bus: state.bus, seat: selectedSeat } });
            } catch (error) {
                console.error('Error booking seat:', error);
            }
        }
    };

    return (
        <div className="seat-map">
            <h2>Select a seat: </h2>
            <div className="seat-map-content">
            {/* Business Seats */}
            {state.bus.businessSeats.map((seat, index) => (
                <div 
                    key={index} 
                    className={
                        `seat business 
                        ${seat.isAvailable ? 'available' : 'booked'} 
                        ${state.type === 'business' ? 'highlight' : 'non'} 
                        ${selectedSeat === seat ? 'selected' : ''}`
                    }
                    onClick={() => {
                        if (seat.isAvailable) {
                            setSelectedSeat(seat);
                        }
                    }}
                >
                    {seat.isAvailable ? seat.number : 'X'}
                </div>
            ))}
            {/* Premium Seats */}
            {state.bus.premiumSeats.map((seat, index) => (
                <div
                    key={index}
                    className={
                        `seat premium 
                        ${seat.isAvailable ? 'available' : 'booked'} 
                        ${state.type === 'premium' ? 'highlight' : 'non'} 
                        ${selectedSeat === seat ? 'selected' : ''}`
                    }
                    onClick={() => {
                        if (seat.isAvailable) {
                            setSelectedSeat(seat);
                        }
                    }}
                >
                    {seat.isAvailable ? seat.number : 'X'}
                </div>
            ))}
            {/* Economy Seats */}
            {state.bus.economySeats.map((seat, index) => (
                <div
                    key={index}
                    className={
                        `seat economy 
                        ${seat.isAvailable ? 'available' : 'booked'} 
                        ${state.type === 'economy' ? 'highlight' : 'non'} 
                        ${selectedSeat === seat ? 'selected' : ''}`
                    }
                    onClick={() => {
                        if (seat.isAvailable) {
                            setSelectedSeat(seat);
                        }
                    }}
                >
                    {seat.isAvailable ? seat.number : 'X'}
                </div>
            ))}
            </div>

            <div className="seat-map-footer">
                <button onClick={handleBookNow}>Book Now</button>
            </div>
        </div>
    );
};

export default SeatSelection;