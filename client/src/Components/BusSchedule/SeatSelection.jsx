import React, { useState, useEffect } from 'react';
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
                let priceNum;
                if (selectedSeat.number.startsWith('E')) { priceNum = state.bus.economyPrice; } 
                
                else if (selectedSeat.number.startsWith('P')) { priceNum = state.bus.premiumPrice; } 
                
                else if (selectedSeat.number.startsWith('B')) { priceNum = state.bus.businessPrice; } 
                
                else {
                    console.error('Unexpected seat number prefix.');
                    return;
                }
                
                console.log('Price to be set:', priceNum)
                console.log('Selected seat:', selectedSeat);

                navigate('/transaction', {
                    state: {
                        ...state, 
                        bus: state.bus,
                        busId: state.bus.busNumber,
                        date: state.bus.date, 
                        seatId: selectedSeat._id,
                        seatNumber: selectedSeat.number,
                        from: state.bus.from,
                        to: state.bus.to,
                        DepartureTime: state.bus.departureTime,
                        ArrivalTime: state.bus.arrivalTime,
                        price: priceNum, 
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