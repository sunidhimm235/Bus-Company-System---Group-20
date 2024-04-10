// export default ManageBusRoutes;
import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import './ManageBusRoutes.css'
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
import {cities} from '../Search/Search.jsx';

// Table
const columns = [
  { id: 'busName', label: 'Bus Name', minWidth: 100, align: 'center', },
  { id: 'busNumber', label: 'Bus Number', minWidth: 100, align: 'center', },
  { id: 'from', label: 'From', minWidth: 100, align: 'center', },
  { id: 'to', label: 'To', minWidth: 100, align: 'center', },
  { id: 'day', label: 'Day', minWidth: 100, align: 'center', },
  {
    id: 'departureTime',
    label: 'Depart Time',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'arrivalTime',
    label: 'Arrival Time',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'duration',
    label: 'Duration',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'economyPrice',
    label: 'Economy Price',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'premiumPrice',
    label: 'Premium Price',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },  
  {
    id: 'businessPrice',
    label: 'Business Price',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'activeStatus',
    label: 'Active Status',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function StickyHeadTable(props) {


  // Get all bus routes
  // const [busRoutes, setBusRoutes] = useState([]) 

  // const fetchData = async () => {
	// 	try {
	// 		const response = await axios.get(`http://localhost:4000/buses/`);
	// 		setBusRoutes(response.data);
  //     console.log(response.data);
	// 	}
	// 	catch (error) {
	// 		console.error('Error fetching data:', error);
	// 	}
	// };

  // useEffect(() => {fetchData();}, []);
  // console.log(busRoutes);
  const { busRoutes } = props; // Use busRoutes from props
  const {searchColumn} = props;
  const {searchQuery} = props;
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
    console.log('Delete:', routeId);
    const isConfirmed = window.confirm("Are you sure you want to delete?");

    if (isConfirmed) {
      axios.delete(`http://localhost:4000/buses/${routeId._id}`)
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
            {busRoutes
            .filter((row) => {
              const value = row[searchColumn].toString().toLowerCase();
              return value.includes(searchQuery.toLowerCase());
            })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && (typeof value === 'number' || typeof value === 'boolean') ? column.format(value) : value}
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
        count={busRoutes.length}
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
const initialRouteFormState = {
  busName: '',
  busNumber: '',
  from: '',
  to: '',
  day: '',
  departureTime: '',
  arrivalTime: '',
  duration: '',
  economyPrice: '',
  businessPrice: '',
  premiumPrice: '',
  economySeats: [
      {number: "E1", isAvailable: true},
      {number: "E2", isAvailable: true},
      {number: "E3", isAvailable: true},
      {number: "E4", isAvailable: true},
      {number: "E5", isAvailable: true},
      {number: "E6", isAvailable: true},
      {number: "E7", isAvailable: true},
      {number: "E8", isAvailable: true},
      {number: "E9", isAvailable: true},
      {number: "E10", isAvailable: true},
      {number: "E11", isAvailable: true},
      {number: "E12", isAvailable: true},
      {number: "E13", isAvailable: true},
      {number: "E14", isAvailable: true},
      {number: "E15", isAvailable: true},
      {number: "E16", isAvailable: true},
      {number: "E17", isAvailable: true},
      {number: "E18", isAvailable: true},
      {number: "E19", isAvailable: true},
      {number: "E20", isAvailable: true}
    ],
    premiumSeats: [
      {number: "P1", isAvailable: true},
      {number: "P2", isAvailable: true},
      {number: "P3", isAvailable: true},
      {number: "P4", isAvailable: true},
      {number: "P5", isAvailable: true},
      {number: "P6", isAvailable: true},
      {number: "P7", isAvailable: true},
      {number: "P8", isAvailable: true},
      {number: "P9", isAvailable: true},
      {number: "P10", isAvailable: true},
      {number: "P11", isAvailable: true},
      {number: "P12", isAvailable: true}
    ],
    businessSeats: [
      {number: "B1", isAvailable: false},
      {number: "B2", isAvailable: true},
      {number: "B3", isAvailable: true},
      {number: "B4", isAvailable: true},
      {number: "B5", isAvailable: true},
      {number: "B6", isAvailable: true},
      {number: "B7", isAvailable: true},
      {number: "B8", isAvailable: true}
    ],
    activeStatus: 'true',
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

const ManageBusRoutes = () => {
  const [searchColumn, setSearchColumn] = useState('busName'); // Default search column
  const [searchQuery, setSearchQuery] = useState('');

  const [currentTab, setCurrentTab] = useState('list'); // 'list', 'create'

  // Moved up from StickyHeadTable
  const [busRoutes, setBusRoutes] = useState([])

  // Fetch bus routes here, similar to your existing fetchData function in StickyHeadTable
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/buses/`);
      setBusRoutes(response.data);
      console.log(response.data);
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // For create/Edit
  const [routeForm, setRouteForm] = useState(initialRouteFormState);

  const [formErrors, setFormErrors] = useState({
    busName: '',
    busNumber: '',
    from: '',
    to: '',
    day: '',
    departureTime: '',
    arrivalTime: '',
    duration: '',
    economyPrice: '',
    premiumPrice: '',
    businessPrice: '',
    activeStatus: '',
  });

  const validateBusName = (name) => {
    return name.trim().length > 0; // Checks if the name is not just empty spaces
  };
  
  const validateBusNumber = (name, number) => {
    const firstLetter = name.trim().charAt(0).toUpperCase();
    return number.startsWith(firstLetter) && /\d+$/.test(number.slice(1));
  };

  const validateCity = (city) => {
    return cities.includes(city);
  };
  
  // Add a new function to validate the day
  const validateDay = (day) => {
    const validDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return validDays.includes(day);
  };

  // Regular expression to validate time format (e.g., 11:35 AM)
  const timeFormatRegex = /^(1[0-2]|0?[1-9]):[0-5][0-9] [APap][mM]$/;

  // Regular expression to validate duration format (e.g., 1 hours 1 minutes)
  const durationFormatRegex = /^\d+\s+hours\s+\d+\s+minutes$/;

  // Regular expression for price validation
  const priceFormatRegex = /^\d+(\.\d{1,2})?$/;

  const validateTime = (time) => {
    return timeFormatRegex.test(time);
  };

  const validateDuration = (duration) => {
    return durationFormatRegex.test(duration);
  };

  const validatePrice = (price) => {
    return priceFormatRegex.test(price);
  };
  
  const validateStatus = (activeStatus) => {
    return ['true', 'false'].includes(activeStatus.toString());
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRouteForm(prevState => ({ ...prevState, [name]: value }));

    // Clear error on change for the specific field being edited
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: '', // Only clear the error for the field being changed
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Object to collect all errors
    let errors = {
      ...formErrors, // Start with current errors
      busName: '',
      busNumber: '',
      from: '',
      to: '',
      day: '',
      departureTime: '',
      arrivalTime: '',
      duration: '',
      economyPrice: '',
      premiumPrice: '',
      businessPrice: '',
      activeStatus: '',
    };

    // Validate Bus Name and Bus Number
    if (!validateBusName(routeForm.busName)) {
      errors.busName = '*Invalid input*'; // Add error message for bus name
    }

    if (!validateBusNumber(routeForm.busName, routeForm.busNumber)) {
      errors.busNumber = '*Invalid input. Bus Number should start with the uppercase first letter of the Bus Name followed by numbers (e.g., for "MetroLine Bus", use "M273")'; // Add error message for bus number
    }
    
    // Validate cities
    if (!validateCity(routeForm.from)) {
      errors.from = '*Invalid city*'; // Add error message for from
    }
    
    if (!validateCity(routeForm.to)) {
      errors.to = '*Invalid city*'; // Add error message for to
    }
    
    // Validate day
    if (!validateDay(routeForm.day)) {
      errors.day = '*Invalid input (e.g., Monday)*'; // Add error message for day
    }

    // Validate departure and arrival times
    const departureTimeValid = validateTime(routeForm.departureTime);
    const arrivalTimeValid = validateTime(routeForm.arrivalTime);
    
    if (!departureTimeValid) {
      errors.departureTime = '*Invalid input (e.g., 11:35 AM)*'; // Add error message for departure time
    }

    if (!arrivalTimeValid) {
      errors.arrivalTime = '*Invalid input (e.g., 11:35 AM)*'; // Add error message for arrival time
    }

    // Validate duration
    const durationValid = validateDuration(routeForm.duration);
    if (!durationValid) {
      errors.duration = '*Invalid input (e.g., 1 hours 1 minutes)*';
    }

    // Validate prices
    if (!validatePrice(routeForm.economyPrice)) {
      errors.economyPrice = '*Invalid input (e.g., 96.1)*';
    }
    if (!validatePrice(routeForm.premiumPrice)) {
      errors.premiumPrice = '*Invalid input (e.g., 104.25)*';
    }
    if (!validatePrice(routeForm.businessPrice)) {
      errors.businessPrice = '*Invalid input (e.g., 175.8)*';
    }

    // Validate active status
    if (!validateStatus(routeForm.activeStatus)) {
      errors.activeStatus = '*Invalid input (e.g., true, false)*';
    }

    // New check for existing bus number
    // const isBusNumberExist = busRoutes.some(route => route.busNumber === routeForm.busNumber);
    // if (isBusNumberExist) {
    //   errors.busNumber = '*This bus number already exists*';
    //   setFormErrors(errors);
    //   return; // Prevent form submission
    // }
    // New check for existing bus number, but only if in 'create' mode
    if (currentTab === 'create') {
      const isBusNumberExist = busRoutes.some(route => route.busNumber === routeForm.busNumber);
      if (isBusNumberExist) {
        errors.busNumber = '*This bus number already exists*';
      }
    }
  
    // If editing, make sure we are not comparing the item to itself
    if (currentTab === 'edit') {
      const isBusNumberExist = busRoutes.some(route => route.busNumber === routeForm.busNumber && route._id !== routeForm._id);
      if (isBusNumberExist) {
        errors.busNumber = '*This bus number is used by another bus*';
      }
    }  

    // Check if any errors were added and return to prevent submission
    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) {
      setFormErrors(errors);
      return; // Prevent form submission if there are any errors
    }

    // Check if any errors were added and return to prevent submission
    if (errors.day || !durationValid || !validateTime(routeForm.departureTime) || !validateTime(routeForm.arrivalTime)) {
      return; // Prevent form submission if there are any errors
    }
    

    console.log('Form submission', routeForm);
    console.log('Current Tab:', currentTab);
    if (currentTab === 'create'){
      axios.post(`http://localhost:4000/buses/`, routeForm)
        .then(response => {
          // Fetch all routes again (simpler but less efficient)
          fetchData();
        })
        .catch(error => console.error('There was an error!', error));
    } 
    else{
      axios.put(`http://localhost:4000/buses/${routeForm._id}`, routeForm)
        .then(response => {
          // Fetch all routes again
          fetchData();
        })
        .catch(error => console.error('There was an error!', error));
    }

    // Here you would handle the form submission to either create or update a route
    // After submission, reset form and switch tab or display success message
    setRouteForm(initialRouteFormState);
    setFormErrors({}); // Clear all errors
    setCurrentTab('list'); // Optional: redirect to list after submission
  };

  const errorStyle = {
    color: 'red',
    fontSize: '12px',
    alignSelf: 'flex-start',
    marginTop: '-20px',
  };

  const handleEditRoute = (routeData) => {
    setRouteForm({ // Assuming your route data matches your form state structure
      busName: routeData.busName,
      busNumber: routeData.busNumber, // Ensure you are mapping fields correctly
      from: routeData.from,
      to: routeData.to,
      day: routeData.day,
      departureTime: routeData.departureTime,
      arrivalTime: routeData.arrivalTime,
      duration: routeData.duration,
      economyPrice: routeData.economyPrice,
      premiumPrice: routeData.premiumPrice,
      businessPrice: routeData.businessPrice,
      activeStatus: routeData.activeStatus,
      _id: routeData._id
      // Continue for all needed fields
    });
    setCurrentTab('edit'); // Switch to the edit tab
    // console.log('Edit:', routeData);
  };

  const getTabButtonStyle = (tab) => ({
    ...tabButtonStyle,
    ...(currentTab === tab ? activeTabStyle : {}),
  });

  // Function to switch tabs
  const switchTab = (tab) => {
    // Clear every error message
    // setDayError('');
    // setTimeErrors({ departureTime: '', arrivalTime: '', duration: '' });
    setFormErrors({}); // Clear all errors
    
    if (tab === 'create') {
      // Reset form state only when switching to the 'create' tab
      setRouteForm(initialRouteFormState);
    }
    setCurrentTab(tab);
  };

  // For the responsive table design
  const tableContainerSx = {
    width: '100%',
    overflowX: 'auto'
  };
  return (
    <div style={containerStyle}>
      <ul style={tabStyle}>
        <li style={getTabButtonStyle('list')} onClick={() => switchTab('list')}>Route Listing</li>
        <li style={getTabButtonStyle('create')} onClick={() => switchTab('create')}>Create Route</li>
        {/* <li style={getTabButtonStyle('edit')} onClick={() => switchTab('edit')}>Edit Route</li> */}
      </ul>
      
      {currentTab === 'list' && (
        <div style={{ paddingTop: '20px', paddingLeft: '20px' }}>
          <select
            value={searchColumn}
            onChange={(e) => setSearchColumn(e.target.value)}
            style={{
              marginRight: '10px',
              fontSize: '1rem',
              height: '2rem',
              padding: '0 0.5rem',
              border: '1px solid #ccc', // Adds a light grey border
              borderRadius: '4px', // Rounds the corners slightly
              width: 'auto', // Adjust as needed, or use 'auto' for automatic width based on content
            }}            
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
      )}

      <div style={contentStyle}>
        {currentTab === 'list' && (
          <TableContainer component={Paper} sx={tableContainerSx}>
            {/* <StickyHeadTable onEdit={handleEditRoute} /> */}
            <StickyHeadTable 
              busRoutes={busRoutes} 
              onEdit={handleEditRoute} 
              refreshData={fetchData} 
              searchColumn={searchColumn}
              searchQuery={searchQuery} 
            />
          </TableContainer>
        )}
        {/* Include your forms and statistics content with appropriate styles */}
        {/* Create/Edit Route Form  */}
        {(currentTab === 'create' || currentTab === 'edit') && (
          <div style={contentStyle}>
            <h2>{currentTab === 'create' ? 'Create' : 'Edit'} Route</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
              <label style={labelStyle}>Bus Name</label>
              <input 
                style={inputStyle} 
                type="text" 
                name="busName" 
                value={routeForm.busName} 
                onChange={handleChange} 
                placeholder="Bus Name (e.g., MetroLine Bus)" 
              />
              {formErrors.busName && <div style={errorStyle}>{formErrors.busName}</div>}
              <label style={labelStyle}>Bus Number</label>
              <input 
                style={inputStyle} 
                type="text" 
                name="busNumber" 
                value={routeForm.busNumber} 
                onChange={handleChange} 
                placeholder="Bus Number (e.g., M273)" 
              />
              {formErrors.busNumber && <div style={errorStyle}>{formErrors.busNumber}</div>}
              <label style={labelStyle}>From</label>
              <input 
                style={inputStyle} 
                type="text" 
                name="from" 
                value={routeForm.from} 
                onChange={handleChange} 
                placeholder="Start Point" 
              />
              {formErrors.from && <div style={errorStyle}>{formErrors.from}</div>}
              <label style={labelStyle}>To</label>
              <input 
                style={inputStyle} 
                type="text" 
                name="to" 
                value={routeForm.to} 
                onChange={handleChange} 
                placeholder="End Point" 
              />
              {formErrors.to && <div style={errorStyle}>{formErrors.to}</div>}
              <label style={labelStyle}>Day</label>
              <input
                style={inputStyle}
                type="text"
                name="day"
                value={routeForm.day}
                onChange={handleChange}
                placeholder="Day (e.g., Monday)"
              />
              {formErrors.day && <div style={errorStyle}>{formErrors.day}</div>}
              <label style={labelStyle}>Departure Time</label>
              <input
                style={inputStyle}
                type="text"
                name="departureTime"
                value={routeForm.departureTime}
                onChange={handleChange}
                placeholder="Departure Time (e.g., 11:35 AM)"
              />
              {formErrors.departureTime && <div style={errorStyle}>{formErrors.departureTime}</div>}
              <label style={labelStyle}>Arrival Time</label>
              <input
                style={inputStyle}
                type="text"
                name="arrivalTime"
                value={routeForm.arrivalTime}
                onChange={handleChange}
                placeholder="Arrival Time (e.g., 11:35 AM)"
              />
              {formErrors.arrivalTime && <div style={errorStyle}>{formErrors.arrivalTime}</div>}
              <label style={labelStyle}>Duration</label>
              <input
                style={inputStyle}
                type="text"
                name="duration"
                value={routeForm.duration}
                onChange={handleChange}
                placeholder="Duration (e.g., 1 hours 1 minutes)"
              />
              {formErrors.duration && <div style={errorStyle}>{formErrors.duration}</div>}
              <label style={labelStyle}>Economy Price</label>
              <input
                style={inputStyle}
                type="text"
                name="economyPrice"
                value={routeForm.economyPrice}
                onChange={handleChange}
                placeholder="Economy Price (e.g., 96.1)"
              />
              {formErrors.economyPrice && <div style={errorStyle}>{formErrors.economyPrice}</div>}
              <label style={labelStyle}>Premium Price</label>
              <input 
                style={inputStyle} 
                type="text" 
                name="premiumPrice" 
                value={routeForm.premiumPrice} 
                onChange={handleChange} 
                placeholder="Premium Price (e.g., 104.25)" 
              />
              {formErrors.premiumPrice && <div style={errorStyle}>{formErrors.premiumPrice}</div>}
              <label style={labelStyle}>Business Price</label>
              <input 
                style={inputStyle} 
                type="text" 
                name="businessPrice" 
                value={routeForm.businessPrice} 
                onChange={handleChange} 
                placeholder="Business Price (e.g., 175.8)" 
              />
              {formErrors.businessPrice && <div style={errorStyle}>{formErrors.businessPrice}</div>}
              {/* <label style={labelStyle}>Active Status</label>
              <input
                style={inputStyle}
                type="text"
                name="activeStatus"
                value={routeForm.activeStatus}
                onChange={handleChange}
                placeholder="true/false"
              />
              {formErrors.activeStatus && <div style={errorStyle}>{formErrors.activeStatus}</div>} */}
              {currentTab === 'edit' && (
                <>
                  <label style={labelStyle}>Active Status</label>
                  <input
                    style={inputStyle}
                    type="text"
                    name="activeStatus"
                    value={routeForm.activeStatus}
                    onChange={handleChange}
                    placeholder="true/false"
                  />
                  {formErrors.activeStatus && <div style={errorStyle}>{formErrors.activeStatus}</div>}
                </>
              )}
              <input type="hidden" name="_id" value={routeForm._id}/>
              <button type="submit" style={buttonStyle}><FaSave /> Save Route</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBusRoutes;
