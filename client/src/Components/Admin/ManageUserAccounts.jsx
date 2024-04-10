import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
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

// Table
const columns = [
  { id: 'userId', label: 'UserId', minWidth: 100, align: 'center', },
  { id: 'username', label: 'Username', minWidth: 100, align: 'center', },
  { id: 'email', label: 'Email', minWidth: 100, align: 'center', },
//   { id: 'password', label: 'Password', minWidth: 100, align: 'center', },
  { id: 'role', label: 'Role', minWidth: 100, align: 'center', },
];

function StickyHeadTable(props) {
    // Get all bus routes
    const [users, setUsers] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/users/`);
            setUsers(response.data);
            console.log(response.data);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {fetchData();}, []);
    console.log(users);
    //////////////////////////////////////////////

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDelete = (routeId) => {
        // Handle delete logic here
        // Handle delete logic here
        console.log('Delete:', routeId);
        const isConfirmed = window.confirm("Are you sure you want to delete?");

        if (isConfirmed) {
          axios.delete(`http://localhost:4000/users/${routeId._id}`);
          window.location.reload();
        } 
        console.log('Delete:', routeId);
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
                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                    const value = row[column.id];
                    return (
                        <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                    );
                    })}
                    {/* Add Edit and Delete buttons in the last TableCell */}
                    <TableCell align="center">
                    <div style={{ marginBottom: '8px' }}> {/* Adds space below the Edit button */}
                        <Button
                        variant="contained"
                        size="small"
                        //onClick={() => handleEdit(row)} // was row.id /////////
                        onClick={() => props.onEdit(row)} // Call the passed function with the row data
                        sx={{
                            backgroundColor: '#92C7CF', //#E5E1DA', // Custom background color
                            color: 'white',
                            '&:hover': {
                            backgroundColor: '#388E3C', // Darker shade when hovering
                            color: 'white',
                            },
                        }}
                        >
                        Edit
                        </Button>
                    </div>
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
            count={users.length}
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

// For create route
const initialUserFormState = {
    userId: '',
    username: '',
    email: '',
    // password: '',
    role: '',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px', // Add space between form elements
    padding: '20px',
    maxWidth: '500px', // Limit the form width for better aesthetics on larger screens
    margin: '0 auto', // Center the form horizontally
};

const labelStyle = {
    alignSelf: 'flex-start', // Align labels to the start of the form
    fontSize: '14px', // Modern, smaller font-size
    fontWeight: '600', // Slightly bolder for better readability
    color: '#333', // Dark grey for labels for higher contrast
};

const inputStyle = {
    width: '100%', // Full width inputs
    padding: '12px 15px', // Padding for better text visibility
    marginBottom: '10px',
    borderRadius: '8px', // Rounded corners for modern look
    border: '1px solid #ccc', // Light border
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)', // Subtle inner shadow for depth
    fontSize: '16px', // Larger font size for readability
};

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff', // Bootstrap primary color
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px', // Larger font size for readability
    fontWeight: '600', // Slightly bolder text
    letterSpacing: '1px', // Spaced out text
    transition: 'background-color 0.3s ease', // Smooth background color transition
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px', // Space between icon and text
};

const ManageUserAccounts = () => {
    const [currentTab, setCurrentTab] = useState('list'); // 'list', 'create'
    // For create/Edit //////////////////
    const [userForm, setUsersForm] = useState(initialUserFormState);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUsersForm(prevState => ({ ...prevState, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submission', userForm);
      console.log('Current Tab:', currentTab);
      if (currentTab === 'create'){
        axios.post(`http://localhost:4000/users/`, userForm);
      } 
      else{
        axios.put(`http://localhost:4000/users/${userForm._id}`, userForm);
      }
      // Here you would handle the form submission to either create or update a route
      // After submission, reset form and switch tab or display success message
      setUsersForm(initialUserFormState);
      setCurrentTab('list'); // Optional: redirect to list after submission
    };
  
    const handleEditAccount = (userData) => {
      setUsersForm({ // Assuming your route data matches your form state structure
        userId: userData.userId,
        username: userData.username,
        email: userData.email, // Ensure you are mapping fields correctly
        // password: userData.password,
        role: userData.role,
        // Continue for all needed fields
        _id: userData._id
      });
      setCurrentTab('edit'); // Switch to the edit tab
      // console.log('Edit:', userData);
    };
    ///////////////////////////////////
  
    const getTabButtonStyle = (tab) => ({
      ...tabButtonStyle,
      ...(currentTab === tab ? activeTabStyle : {}),
    });
  
    // Function to switch tabs
    const switchTab = (tab) => {
      if (tab === 'create') {
        // Reset form state only when switching to the 'create' tab
        setUsersForm(initialUserFormState);
      }
      setCurrentTab(tab);
    };
  
    ////////////////////////////////////
    // For the responsive table design
    const tableContainerSx = {
      width: '100%',
      overflowX: 'auto'
    };
    return (
      <div style={containerStyle}>
        <ul style={tabStyle}>
          <li style={getTabButtonStyle('list')} onClick={() => switchTab('list')}>Account Listing</li>
          <li style={getTabButtonStyle('create')} onClick={() => switchTab('create')}>Create Account</li>
        </ul>
  
        <div style={contentStyle}>
          {currentTab === 'list' && (
            <TableContainer component={Paper} sx={tableContainerSx}>
              <StickyHeadTable onEdit={handleEditAccount} />
            </TableContainer>
          )}
          {/* Include your forms and statistics content with appropriate styles */}
          {/* Create/Edit Route Form  */}
          {currentTab === 'create' && (
            <div style={contentStyle}>
              <h2>Create Account</h2>
              <form onSubmit={handleSubmit} style={formStyle}>
                <label style={labelStyle}>User ID</label>
                <input style={inputStyle} type="text" name="userId" value={userForm.userId} onChange={handleChange} placeholder="Enter user ID" />
                <label style={labelStyle}>Username</label>
                <input style={inputStyle} type="text" name="username" value={userForm.username} onChange={handleChange} placeholder="Enter Username" />
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} type="text" name="email" value={userForm.email} onChange={handleChange} placeholder="Enter email" />
                {/* <label style={labelStyle}>Password</label> */}
                {/* <input style={inputStyle} type="text" name="password" value={userForm.password} onChange={handleChange} placeholder="Enter password" /> */}
                <label style={labelStyle}>Role</label>
                <input style={inputStyle} type="text" name="role" value={userForm.role} onChange={handleChange} placeholder="Enter role" />
                <input type="hidden" name="_id" value={userForm._id}/>
                <button type="submit" style={buttonStyle}><FaSave /> Save Route</button>
              </form>
            </div>
          )}
          {currentTab === 'edit' && (
           <div style={contentStyle}>
            <h2>Edit Account</h2>
              <form onSubmit={handleSubmit} style={formStyle}>
              <label style={labelStyle}>User ID</label>
                <input style={inputStyle} type="text" name="userId" value={userForm.userId} onChange={handleChange} placeholder="Enter user ID" />
                <label style={labelStyle}>Username</label>
                <input style={inputStyle} type="text" name="username" value={userForm.username} onChange={handleChange} placeholder="Enter Username" />
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} type="text" name="email" value={userForm.email} onChange={handleChange} placeholder="Enter email" />
                {/* <label style={labelStyle}>Password</label> */}
                {/* <input style={inputStyle} type="text" name="password" value={userForm.password} onChange={handleChange} placeholder="Enter password" /> */}
                <label style={labelStyle}>Role</label>
                <input style={inputStyle} type="text" name="role" value={userForm.role} onChange={handleChange} placeholder="Enter role" />
                <button type="submit" style={buttonStyle}><FaSave /> Save Route</button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  };
  
export default ManageUserAccounts;