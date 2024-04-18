import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

const columns = [
  { id: 'bookingId', label: 'Booking ID', align: 'center', minWidth: 100 },
  { id: 'busId', label: 'Bus ID', align: 'center', minWidth: 100 },
  { id: 'date', label: 'Date', align: 'center', minWidth: 100, format: (value) => new Date(value).toLocaleDateString() },
  { id: 'seatNumber', label: 'Seat Number', align: 'center', minWidth: 100 },
  { id: 'from', label: 'From', align: 'center', minWidth: 100 },
  { id: 'to', label: 'To', align: 'center', minWidth: 100 },
  { id: 'DepartureTime', label: 'Departure Time', align: 'center', minWidth: 100 },
  { id: 'ArrivalTime', label: 'Arrival Time', align: 'center', minWidth: 100 },
  { id: 'price', label: 'Price', align: 'center', minWidth: 100, format: (value) => `$${value.toFixed(2)}` },
  { id: 'createdAt', label: 'Created At', align: 'center', minWidth: 100, format: (value) => new Date(value).toLocaleString() }
];

function StickyHeadTable(props) {
  const { reservations, refetchReservations, token } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (reservation) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel this reservation?");
    if (isConfirmed) {
      console.log('Deleting reservation:', reservation);
      console.log('Reservation id:', reservation._id);

      axios.delete(`http://localhost:4000/api/reservations/${reservation._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        refetchReservations();
      })
      .catch((error) => {
        console.error('Error deleting reservation:', error);
      });

      // Change available seat status to true
      axios.patch(`http://localhost:4000/api/buses/${reservation.busId}/cancel-seat`, {
        seatNumber: reservation.seatNumber,
        busId: reservation.busId
      })
      .then(() => {
        console.log('Seat canceled successfully');
      })
      .catch((error) => {
        console.error('Error canceling seat:', error);
      });
    } 
  };

  return (
    <Paper sx={{ display: 'grid', width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reservation, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column) => {
                  const value = reservation[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format ? column.format(value) : value}
                    </TableCell>
                  );
                })}
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleDelete(reservation)}
                    sx={{
                      backgroundColor: '#92C7CF', //'#E5E1DA', // Custom background color
                      color: 'white',
                      '&:hover': {
                          backgroundColor: '#d32f2f', // Darker shade when hovering
                          color: 'white',
                      },
                      }}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={reservations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const token = localStorage.getItem('token');

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/reservations?page=${page}&limit=${rowsPerPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(response.data.reservations);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [page, rowsPerPage, token]);

  return (
    <div style={{ flexGrow: 1, padding: '20px', paddingTop: '150px' }}>
      <h1>Your Reservations</h1>
      <div>
        <TableContainer component={Paper}>
          <StickyHeadTable 
            reservations={reservations} 
            refetchReservations={fetchReservations}
            token={token}
          />
        </TableContainer>
      </div>
    </div>
  );
};

export default ReservationsPage;
