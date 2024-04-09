import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ReservationSuccessPage = () => {
    const { state } = useLocation();

    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f0f4f8',
        padding: '20px',
    };

    const successMessageStyle = {
        color: '#4CAF50', 
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '20px 0',
    };

    const linkStyle = {
        display: 'inline-block',
        backgroundColor: '#007bff', 
        color: '#fff', 
        padding: '10px 15px',
        borderRadius: '5px',
        textDecoration: 'none',
        marginTop: '20px',
    };

    return (
        <div style={pageStyle}>
            <h2 style={successMessageStyle}>Success!</h2>
            <p>Your reservation has been successfully completed.</p>
            {state?.message && <p>{state.message}</p>}
            <Link to="/reservations" style={linkStyle}>View My Reservations</Link>
        </div>
    );
};

export default ReservationSuccessPage;