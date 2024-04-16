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
import { format } from 'date-fns';
// import AdminSidebar from './AdminSidebar'; // Adjust the import path as needed
// import DashboardCards from './DashboardCards';
// import ManageBusRoutes from './ManageBusRoutes';
// import ManageUserAccounts from './ManageUserAccounts';
// import ManageAdminAccounts from './ManageAdminAccounts';
// import ManageEmployeeAccounts from './ManageEmployeeAccounts';
// import Feedbacks from './Feedbacks';

// Table
const columns = [
  { 
    id: 'username', 
    label: 'Username', 
    minWidth: 100, 
    align: 'center',
    format: (value) => value?.userId?.username || 'No username', // Accessing nested username
  },
  { 
    id: 'destination', 
    label: 'Destination', 
    minWidth: 100, 
    align: 'center'
  },
  { 
    id: 'date', 
    label: 'Date', 
    minWidth: 100, 
    align: 'center',
    format: (value) => new Date(value.date).toLocaleDateString() // Formatting the date
  },
  { 
    id: 'price', 
    label: 'Price', 
    minWidth: 100, 
    align: 'center',
    format: (value) => `$${value.price}` // Formatting the price
  },
  { 
    id: 'seatNumber', 
    label: 'Seat Number', 
    minWidth: 100, 
    align: 'center'
  }
];

function StickyHeadTable(props) {
  const {users} = props;
  const {searchColumn} = props;
  const {searchQuery} = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const filteredUsers = users.filter((row) => {
    const value = row[searchColumn]?.toString().toLowerCase();
    return searchQuery ? value.includes(searchQuery.toLowerCase()) : true;
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
    console.log('Delete:', routeId);
    const isConfirmed = window.confirm("Are you sure you want to delete?");

    if (isConfirmed) {
      axios.delete(`http://localhost:4000/api/reservations/all/${routeId._id}`)
        .then(() => {
          // Call the refresh function passed as a prop
          props.refreshData();
        })
        .catch(error => {
          console.error("Error deleting the item:", error);
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
                  console.log("ROW: " ,row);
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

const tabStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    listStyle: 'none',
    padding: '10px',
    backgroundColor: '#E5E1DA',
    margin: 0,
};

const tabButtonStyle = {
    flex: 1,
    padding: '10px',
    cursor: 'pointer',
    textAlign: 'center',
    backgroundColor: '#f2f2f2',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.3s',
};

const activeTabStyle = {
    backgroundColor: '#92C7CF',
    color: 'white'
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
    <div 
      style={{ 
        flexGrow: 1, 
        padding: '20px',
      }}>
      <div>
        <h1>Manage Reservations</h1>
        <div style={{padding: '10px'}}></div>
        <div style={containerStyle}>
          <div style={{ paddingTop: '20px', paddingLeft: '20px' }}>
            <select        
              value={searchColumn}
              onChange={(e) => setSearchColumn(e.target.value)}
              style={inputSearchStyle}  
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
              style={inputSearchStyle}
            />
            <Button 
              onClick={() => setSearchQuery('')}
              variant="contained"
              size="small"
              sx={{
                backgroundColor: '#92C7CF', //'#E5E1DA', // Custom background color
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
  );
};
export default Employee;