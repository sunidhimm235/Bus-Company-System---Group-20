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

    console.log(state);

    useEffect(() => {
    if (state?.bus) {
        setLoading(false);
    }
    }, [state]);

    // Loading message
    if (loading) {
        return <div>Loading seats...</div>;
    }

    const handleBookNow = async () => {
        if (selectedSeat) {
            try {
                console.log('Bus ID:', state.bus._id);
                console.log('Seat ID:', selectedSeat._id);

                const response = await axios.patch(`http://localhost:4000/buses/${state.bus._id}/book-seat`, {
                    seatId: selectedSeat._id 
                });

                console.log(response.data.message);

                console.log(state.bus._id)
                console.log(selectedSeat._id)
                console.log(state.bus.destination)
                console.log(state.bus.date)
                console.log(selectedSeat.price)
    
                navigate('/transaction', {
                    state: {
                      ...state, 
                      seatId: selectedSeat._id, 
                      seatNumber: selectedSeat.number, 
                      destination: state.bus.destination, 
                      date: state.bus.date, 
                      price: selectedSeat.price, 
                    }
                  });
            } 
            
            catch (error) {
                console.error('Error booking seat:', error);
            }
        }
    };

    return (
        <div className="seat-map">
            <h2>Select a seat: </h2>
            <div className="seat-map-content">
            {}
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
            {}
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
            {}
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