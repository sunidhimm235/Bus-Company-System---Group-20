import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/reservations?page=${currentPage}&limit=10`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservations(response.data.reservations);
        setTotalPages(response.data.totalPages);
      } 
      
      catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [currentPage, token]);

  const renderPagination = () => {
    return Array.from({ length: totalPages }, (_, i) => (
      <button key={i} onClick={() => setCurrentPage(i + 1)} style={{ margin: '0 5px' }}>
        {i + 1}
      </button>
    ));
  };

  return (
    <div>
      <h2>Your Reservations</h2>
      {reservations.map(reservation => (
        <div key={reservation._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <p><strong>Destination:</strong> {reservation.destination}</p>
          <p><strong>Date:</strong> {new Date(reservation.date).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {reservation.isPast ? <span style={{ color: 'red' }}>Past</span> : <span style={{ color: 'green' }}>Upcoming</span>}</p>
          <p><strong>Seat Number:</strong> {reservation.seatNumber}</p>
          <p><strong>Price:</strong> ${reservation.price}</p>
        </div>
      ))}
      <div style={{ marginTop: '20px' }}>
        {renderPagination()}
      </div>
    </div>
  );
};

export default ReservationsPage;