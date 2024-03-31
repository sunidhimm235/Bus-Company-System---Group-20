import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isAuthenticated } from '../../utils/auth'; // Adjust the import path as necessary

const TravelHistory = () => {
    const [travelHistory, setTravelHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTravelHistory = async () => {
            setLoading(true);
            try {
                // Replace with your actual API call
                const { data } = await axios.get('http://localhost:4000/api/travel-history', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setTravelHistory(data);
            } catch (err) {
                console.error('Failed to fetch travel history:', err);
                setError('Failed to load travel history.');
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated()) {
            fetchTravelHistory();
        } else {
            setError('You must be logged in to view this page.');
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Travel History</h1>
            {travelHistory.length ? (
                <ul>
                    {travelHistory.map((item, index) => (
                        <li key={index}>
                            <div>Date: {item.date}</div>
                            <div>Destination: {item.destination}</div>
                            <div>Price: ${item.price}</div>
                            {}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no travel history.</p>
            )}
        </div>
    );
};

export default TravelHistory;