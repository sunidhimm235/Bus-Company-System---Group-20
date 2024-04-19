import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import EmployeeNavbar from './EmployeeNavbar';

// Table
const columns = [
  { 
    id: 'username', 
    label: 'Username', 
    minWidth: 100, 
    align: 'center',
    format: (value) => value?.userId?.username || 'No username', // Accessing nested username
  },
  { id: 'bookingId', label: 'Booking ID', align: 'center', minWidth: 100 },
  { id: 'busId', label: 'Bus ID', align: 'center', minWidth: 100 },
  { id: 'date', label: 'Date', align: 'center', minWidth: 100, format: (value) => new Date(value).toLocaleDateString() },
  { id: 'seatNumber', label: 'Seat Number', align: 'center', minWidth: 100 },
  { id: 'from', label: 'From', align: 'center', minWidth: 100 },
  { id: 'to', label: 'To', align: 'center', minWidth: 100 },
  { id: 'DepartureTime', label: 'Departure Time', align: 'center', minWidth: 100 },
  { id: 'ArrivalTime', label: 'Arrival Time', align: 'center', minWidth: 100 },
  { id: 'price', label: 'Price', align: 'center', minWidth: 100 },
  { id: 'createdAt', label: 'Created At', align: 'center', minWidth: 100, format: (value) => new Date(value).toLocaleString() }
];

function StickyHeadTable(props) {
  const {users} = props;
  const {searchColumn} = props;
  const {searchQuery} = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const filteredUsers = users.filter((row) => {
  //   const value = row[searchColumn]?.toString().toLowerCase();
  //   return searchQuery ? value.includes(searchQuery.toLowerCase()) : true;
  // });
  const filteredUsers = users.filter((row) => {
    let value = ''; // Default empty string if not found
    if (searchColumn === 'username') {
      value = row.userId ? row.userId.username : ''; // Safely access nested username
    } else {
      value = row[searchColumn]?.toString().toLowerCase() || '';
    }
    return searchQuery ? value.toLowerCase().includes(searchQuery.toLowerCase()) : true;
  });  
  
  useEffect(() => {
    const totalFilteredItems = filteredUsers.length;
    const maxPages = Math.ceil(totalFilteredItems / rowsPerPage) - 1; // -1 because pages are zero-indexed
    if (page > maxPages) {
      setPage(maxPages >= 0 ? maxPages : 0); // Ensure page is not set to a negative value
    }
  }, [filteredUsers.length, rowsPerPage, page]);  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };

  const handleDelete = (routeId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");

    if (isConfirmed) {
      console.log('Deleting:', routeId);
      console.log('Route ID:', routeId._id);

      axios.delete(`http://localhost:4000/api/reservations/${routeId._id}/delete-wo-security`)
      .then((response) => {
        console.log('Deleted:', response.data);
        props.refreshData();
      })
      .catch((error) => {
        console.error('Error deleting:', error);
      });

      console.log('id:', routeId._id);
      console.log('busId:', routeId.busId);
      console.log('seatNumber:', routeId.seatNumber);

      axios.patch(`http://localhost:4000/buses/${routeId.busId}/cancel-seat-wo-security`, {
        seatNumber: routeId.seatNumber,
        busId: routeId.busId
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
      <TableContainer sx={{  }}> {/* maxHeight: 440 */}
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
              {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                  const value = row[column.id];
                  // console.log("ROW: " ,row);
                  return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(row) : value}
                      </TableCell>
                  );
                  })}
                  {/* Add Edit and Delete buttons in the last TableCell */}
                  <TableCell align="center">
                  <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleDelete(row)}
                      sx={{
                      backgroundColor: '#92C7CF', //'#E5E1DA', // Custom background color
                      color: 'white',
                      '&:hover': {
                          backgroundColor: '#d32f2f', // Darker shade when hovering
                          color: 'white',
                      },
                      }}
                  >
                      Delete
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
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Paper>
  );
}

const containerStyle = {
    margin: '0 auto',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
};

const contentStyle = {
    padding: '20px',
};

const inputSearchStyle = {
  width: 'auto', // Full width inputs
  padding: '12px 15px', // Padding for better text visibility
  marginBottom: '-10px',
  marginRight: '10px',
  borderRadius: '8px', // Rounded corners for modern look
  border: '1px solid #ccc', // Light border
  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)', // Subtle inner shadow for depth
  fontSize: '16px', // Larger font size for readability
};

const Employee = () => {
  const correctPasscode = 'employeeAccess123'; // Your hardcoded passcode
  const [passcode, setPasscode] = useState('');
  const [hasAccess, setHasAccess] = useState(false);

  const checkPasscode = () => {
    if (passcode === correctPasscode) {
      setHasAccess(true);
    } else {
      alert('Incorrect passcode!');
      setPasscode('');
    }
  };

  const [searchColumn, setSearchColumn] = useState('username'); // Default search column
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([])
  
  const fetchData = async () => {
    try {
        const response = await axios.get(`http://localhost:4000/api/reservations/all/`);
        setUsers(response.data);
        console.log(response.data);
        console.log(response.data[0].userId.username)
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // For the responsive table design
  const tableContainerSx = {
    width: '100%',
    overflowX: 'auto'
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {!hasAccess && (
        <div style={{
          padding: '20px',
          width: '100%',
          height: '100vh', // Set the height to fill the viewport vertically
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column', // Stack the elements vertically
          background: '#ecf0f3' // A light gray background
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <h2 style={{
              color: '#333',
              marginBottom: '20px'
            }}>Enter Passcode to Access the Employee Dashboard</h2>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
              style={{
                width: '100%',
                padding: '15px 20px',
                marginRight: '10px',
                marginBottom: '20px',
                border: 'none',
                outline: 'none',
                borderRadius: '5px',
                boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)'
              }}
            />
            <button
              onClick={checkPasscode}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '20px', // more rounded corners
                background: '#ADD8E6', // this is a placeholder for light blue color, replace with the exact color from your button
                color: 'white',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // softer shadow
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.target.style.background = '#9acfea'} // a slightly darker shade for hover, replace with the correct color
              onMouseOut={(e) => e.target.style.background = '#ADD8E6'} // original color, replace with the correct color
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {hasAccess && (
        <div>
          <EmployeeNavbar />
          <div style={{ flexGrow: 1, padding: '20px' }}>
            <div>
              <div style={containerStyle}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingLeft: '20px',
                  paddingTop: '10px',
                  gap: '10px' // Adds space between elements vertically
                }}>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap', // Allows items to wrap in a new line on small screens
                    gap: '10px', // Adds space between items horizontally
                  }}>
                    <select
                      value={searchColumn}
                      onChange={(e) => setSearchColumn(e.target.value)}
                      style={{ ...inputSearchStyle, width: '200px' }} // Fixed width for select
                    >
                      {columns.map((column) => (
                        <option key={column.id} value={column.id}>
                          {column.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ ...inputSearchStyle, width: '300px' }} // Fixed width for input
                    />
                    <Button 
                      onClick={() => setSearchQuery('')}
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: '#92C7CF', // Custom background color
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#d32f2f', // Darker shade when hovering
                          color: 'white',
                        },
                      }}
                    >
                    Clear
                    </Button>
                  </div>
                </div>

                <div style={contentStyle}>
                  <TableContainer component={Paper} sx={tableContainerSx}>
                    <StickyHeadTable 
                      users={users} 
                      refreshData={fetchData} 
                      searchColumn={searchColumn}
                      searchQuery={searchQuery} 
                    />
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Employee;