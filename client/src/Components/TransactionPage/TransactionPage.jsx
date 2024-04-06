import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TransactionPage = () => {
    const location = useLocation(); 
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        destination = '',
        date = '',
        seatNumber = '',
        price = 0,
        busId = '',
        seatId = ''
    } = location.state || {};

    const formattedDate = date ? new Date(date).toLocaleDateString() : 'N/A';

    const handleCompleteTransaction = async () => {
        setIsSubmitting(true);
    
        console.log("Received state in TransactionPage:", { destination, date, seatNumber, price });
        console.log("Original Date:", date);
        console.log("Formatted Date:", formattedDate);
    
        const token = localStorage.getItem('token');
    
        try {
            console.log("Sending reservation data:", { destination, date, seatNumber, price, status: 'completed' });
            console.log('token:', token)
            
            const response = await axios.post('http://localhost:4000/api/reservations', {
                destination,
                date,
                seatNumber,
                price,
                status: 'completed',
            }, { headers: { Authorization: `Bearer ${token}` } });
    
            console.log('Reservation created successfully:', response.data);
            
            await axios.patch(`http://localhost:4000/buses/${busId}/book-seat`, {
                seatId: seatId
            }, { headers: { Authorization: `Bearer ${token}` } });

            console.log(`Seat ${seatId} on bus ${busId} marked as booked.`);
    
            navigate('/reservation-success', {
                state: {
                    message: 'Your reservation has been successfully completed!',
                    destination,
                    date: formattedDate,
                    seatNumber,
                    price,
                },
            });
        } 
        
        catch (error) {
            console.error('Failed to complete reservation:', error);
            setIsSubmitting(false);
        }
    };

    if (!location.state) {
        return <div>Please select a seat to proceed with the reservation.</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.page}>
                <h2 style={styles.header}>Confirm Your Reservation</h2>
                <div style={styles.details}>
                    <p>Destination: <strong>{destination}</strong></p>
                    <p>Date: <strong>{formattedDate}</strong></p>
                    <p>Seat Number: <strong>{seatNumber}</strong></p>
                    <p>Price: <strong>${price.toFixed(2)}</strong></p>
                </div>
                <button 
                    style={styles.button} 
                    onClick={handleCompleteTransaction} 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : 'Complete Transaction'}
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        padding: '20px',
    },

    page: {
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    },

    header: {
        marginBottom: '20px',
        textAlign: 'center',
    },

    details: {
        marginBottom: '20px',
        lineHeight: '1.6',
    },

    button: {
        width: '100%',
        padding: '10px 0',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default TransactionPage;