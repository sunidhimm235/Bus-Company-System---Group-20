// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ReservationsPage = () => {
//   const [reservations, setReservations] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const token = localStorage.getItem('token'); 

//   useEffect(() => {
//     const fetchReservations = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/reservations?page=${currentPage}&limit=10`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setReservations(response.data.reservations);
//         setTotalPages(response.data.totalPages);
//       } 
      
//       catch (error) {
//         console.error('Error fetching reservations:', error);
//       }
//     };

//     fetchReservations();
//   }, [currentPage, token]);

//   const renderPagination = () => {
//     return Array.from({ length: totalPages }, (_, i) => (
//       <button key={i} onClick={() => setCurrentPage(i + 1)} style={{ margin: '0 5px' }}>
//         {i + 1}
//       </button>
//     ));
//   };

//   return (
//     <div>
//       <h2>Your Reservations</h2>
//       {reservations.map(reservation => (
//         <div key={reservation._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
//           <p><strong>Destination:</strong> {reservation.destination}</p>
//           <p><strong>Date:</strong> {new Date(reservation.date).toLocaleDateString()}</p>
//           <p><strong>Status:</strong> {reservation.isPast ? <span style={{ color: 'red' }}>Past</span> : <span style={{ color: 'green' }}>Upcoming</span>}</p>
//           <p><strong>Seat Number:</strong> {reservation.seatNumber}</p>
//           <p><strong>Price:</strong> ${reservation.price}</p>
//         </div>
//       ))}
//       <div style={{ marginTop: '20px' }}>
//         {renderPagination()}
//       </div>
//     </div>
//   );
// };

// export default ReservationsPage;

//////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import Button from '@mui/material/Button';

// const columns = [
//   { id: 'destination', label: 'Destination', align: 'center', minWidth: 100 },
//   { id: 'date', label: 'Date', align: 'center', minWidth: 100, format: (value) => new Date(value).toLocaleDateString() },
//   { id: 'status', label: 'Status', align: 'center', minWidth: 100 },
//   { id: 'seatNumber', label: 'Seat Number', align: 'center', minWidth: 100 },
//   { id: 'price', label: 'Price', align: 'center', minWidth: 100, format: (value) => `$${value.toFixed(2)}` }
// ];

// function StickyHeadTable(props) {
//   const { reservations, refetchReservations, token } = props; // Destructure props including token
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   // const [page, setPage] = useState(0);
//   // const [rowsPerPage, setRowsPerPage] = useState(10);
  
//   useEffect(() => {
//     // if (page > Math.ceil(reservations.length / rowsPerPage) - 1) {
//     //   setPage(0); // Ensure the page index is reset when data changes or out of range
//     // }
//     const totalPages = reservations.length;
//     const maxPages = Math.ceil(totalPages / rowsPerPage) - 1; // -1 because pages are zero-indexed
//     if (page > maxPages) {
//       setPage(maxPages >= 0 ? maxPages : 0); // Ensure page is not set to a negative value
//     }
//   }, [reservations.length, rowsPerPage, page]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//       setRowsPerPage(+event.target.value);
//       setPage(0);
//   };

  

//   const handleDelete = (reservation) => {
//     const isConfirmed = window.confirm("Are you sure you want to cancel this reservation?");
//     if (isConfirmed) {
//       axios.delete(`http://localhost:4000/api/reservations/${reservation._id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(() => {
//         refetchReservations(); // Now correctly calling the function passed as prop
//       })
//       .catch(error => {
//         console.error("Error canceling the reservation:", error);
//       });
//     } 
//   };

//   return (
//       <Paper sx={{ display: 'grid', width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//           <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//               <TableRow>
//               {columns.map((column) => (
//                   <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                   >
//                   {column.label}
//                   </TableCell>
//               ))}
//               </TableRow>
//           </TableHead>
//           <TableBody>
//               {reservations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((reservation, index) => (
//               <TableRow hover role="checkbox" tabIndex={-1} key={reservation._id}>
//                   {columns.map((column) => {
//                     const value = reservation[column.id];
//                     return (
//                       <TableCell key={column.id} align={column.align}>
//                         {column.format ? column.format(value) : value}
//                       </TableCell>
//                     );
//                   })}
//                   <TableCell align="center">
//                     <Button
//                       variant="contained"
//                       size="small"
//                       onClick={() => handleDelete(reservation)}
//                       sx={{ backgroundColor: '#d32f2f', color: 'white' }}
//                     >
//                       Cancel
//                     </Button>
//                   </TableCell>
//               </TableRow>
//               ))}
//           </TableBody>
//           </Table>
//       </TableContainer>
//       <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={reservations.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//       </Paper>
//   );
// }

// const ReservationsPage = () => {
//   const [reservations, setReservations] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const token = localStorage.getItem('token');

//   // Define fetchReservations function
//   const fetchReservations = async () => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/reservations?page=${page}&limit=${rowsPerPage}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setReservations(response.data.reservations);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error('Error fetching reservations:', error);
//     }
//   };

//   useEffect(() => {
//     fetchReservations();
//   }, [page, rowsPerPage, token]);

//   return (
//     <div>
//       {/* <EmployeeNavbar /> Optionally include if part of your application */}
//       <div style={{ flexGrow: 1, padding: '20px' }}>
//         <div>
//           <div style={{ margin: '0 auto', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
//             <div style={{ padding: '20px' }}>
//               <TableContainer component={Paper}>
//                 <StickyHeadTable 
//                   reservations={reservations} 
//                   refetchReservations={fetchReservations} // This is how you were trying to pass it, make sure it is named consistently
//                   token={token}
//                 />
//               </TableContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReservationsPage;

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
  { id: 'destination', label: 'Destination', align: 'center', minWidth: 100 },
  { id: 'date', label: 'Date', align: 'center', minWidth: 100, format: (value) => new Date(value).toLocaleDateString() },
  { id: 'status', label: 'Status', align: 'center', minWidth: 100 },
  { id: 'seatNumber', label: 'Seat Number', align: 'center', minWidth: 100 },
  { id: 'price', label: 'Price', align: 'center', minWidth: 100, format: (value) => `$${value.toFixed(2)}` }
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
      axios.delete(`http://localhost:4000/api/reservations/${reservation._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        refetchReservations(); // Refresh data
      })
      .catch(error => {
        console.error("Error canceling the reservation:", error);
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
