// export default ManageBusRoutes;
import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaBus, FaUserFriends, FaSave, FaCaretDown } from 'react-icons/fa';
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

// Table
const columns = [
  { id: 'busName', label: 'Bus Name', minWidth: 100, align: 'center', },
  { id: 'busNumber', label: 'Bus Number', minWidth: 100, align: 'center', },
  { id: 'from', label: 'From', minWidth: 100, align: 'center', },
  { id: 'to', label: 'To', minWidth: 100, align: 'center', },
  { id: 'day', label: 'Day', minWidth: 100, align: 'center', },
  // {
  //   id: 'capacity',
  //   label: 'Total Seats',
  //   minWidth: 100,
  //   align: 'center',
  //   format: (value) => value.toLocaleString('en-US'),
  // },
  // {
  //   id: 'openSeats',
  //   label: 'Available Seats',
  //   minWidth: 100,
  //   align: 'center',
  //   format: (value) => value.toLocaleString('en-US'),
  // },  
  // {
    //   id: 'filledSeats',
    //   label: 'Booked Seats',
    //   minWidth: 100,
    //   align: 'center',
    //   format: (value) => value.toLocaleString('en-US'),
    // },
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
    label: 'Status',
    minWidth: 100,
    align: 'center',
    //format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  {
    busID: 1,
    busName: 'B001',
    startPoint: 'Los Angeles',
    endPoint: 'San Antonio',
    capacity: 47,
    openSeats: 33,
    filledSeats: 14,
    economyPrice: '$25',
    premiumPrice: '$80',
    businessPrice: '$100',
    departTime: '07:58 AM',
    arrivalTime: '05:23 AM',
    duration: '4 hours'
  },
  {
    busID: 2,
    busName: 'B002',
    startPoint: 'New York',
    endPoint: 'Columbus',
    capacity: 48,
    openSeats: 46,
    filledSeats: 2,
    economyPrice: '$25',
    premiumPrice: '$70',
    businessPrice: '$140',
    departTime: '06:28 AM',
    arrivalTime: '06:34 AM',
    duration: '2 hours'
  },
  {
    busID: 3,
    busName: 'B003',
    startPoint: 'San Jose',
    endPoint: 'New York',
    capacity: 46,
    openSeats: 29,
    filledSeats: 17,
    economyPrice: '$35',
    premiumPrice: '$60',
    businessPrice: '$140',
    departTime: '06:56 AM',
    arrivalTime: '05:09 AM',
    duration: '2 hours'
  },
  {
    busID: 4,
    busName: 'B004',
    startPoint: 'Charlotte',
    endPoint: 'San Antonio',
    capacity: 30,
    openSeats: 28,
    filledSeats: 2,
    economyPrice: '$40',
    premiumPrice: '$70',
    businessPrice: '$120',
    departTime: '08:49 AM',
    arrivalTime: '09:12 AM',
    duration: '4 hours'
  },
  {
    busID: 5,
    busName: 'B005',
    startPoint: 'San Antonio',
    endPoint: 'Los Angeles',
    capacity: 36,
    openSeats: 7,
    filledSeats: 29,
    economyPrice: '$30',
    premiumPrice: '$60',
    businessPrice: '$140',
    departTime: '06:10 AM',
    arrivalTime: '08:02 AM',
    duration: '4 hours'
  },
  {
    busID: 6,
    busName: 'B006',
    startPoint: 'Houston',
    endPoint: 'Charlotte',
    capacity: 37,
    openSeats: 30,
    filledSeats: 7,
    economyPrice: '$40',
    premiumPrice: '$70',
    businessPrice: '$100',
    departTime: '08:58 AM',
    arrivalTime: '08:15 AM',
    duration: '3 hours'
  },
  {
    busID: 7,
    busName: 'B007',
    startPoint: 'Dallas',
    endPoint: 'San Antonio',
    capacity: 32,
    openSeats: 24,
    filledSeats: 8,
    economyPrice: '$25',
    premiumPrice: '$60',
    businessPrice: '$120',
    departTime: '05:23 AM',
    arrivalTime: '10:55 PM',
    duration: '1 hour'
  },
  {
    busID: 8,
    busName: 'B008',
    startPoint: 'Phoenix',
    endPoint: 'San Jose',
    capacity: 48,
    openSeats: 18,
    filledSeats: 30,
    economyPrice: '$35',
    premiumPrice: '$80',
    businessPrice: '$100',
    departTime: '07:12 AM',
    arrivalTime: '08:43 AM',
    duration: '3 hours'
  },
  {
    busID: 9,
    busName: 'B009',
    startPoint: 'Jacksonville',
    endPoint: 'Philadelphia',
    capacity: 30,
    openSeats: 3,
    filledSeats: 27,
    economyPrice: '$25',
    premiumPrice: '$60',
    businessPrice: '$120',
    departTime: '08:28 AM',
    arrivalTime: '07:01 AM',
    duration: '4 hours'
  },
  {
    busID: 10,
    busName: 'B010',
    startPoint: 'Columbus',
    endPoint: 'Jacksonville',
    capacity: 45,
    openSeats: 8,
    filledSeats: 37,
    economyPrice: '$40',
    premiumPrice: '$70',
    businessPrice: '$160',
    departTime: '06:48 AM',
    arrivalTime: '08:18 AM',
    duration: '5 hours'
  },
  {
    busID: 11,
    busName: 'B011',
    startPoint: 'Columbus',
    endPoint: 'Phoenix',
    capacity: 45,
    openSeats: 38,
    filledSeats: 7,
    economyPrice: '$30',
    premiumPrice: '$80',
    businessPrice: '$140',
    departTime: '06:58 AM',
    arrivalTime: '06:09 AM',
    duration: '1 hour'
  },
  {
    busID: 12,
    busName: 'B012',
    startPoint: 'Jacksonville',
    endPoint: 'Fort Worth',
    capacity: 45,
    openSeats: 16,
    filledSeats: 29,
    economyPrice: '$30',
    premiumPrice: '$70',
    businessPrice: '$160',
    departTime: '05:22 AM',
    arrivalTime: '08:15 AM',
    duration: '2 hours'
  },
  {
    busID: 13,
    busName: 'B013',
    startPoint: 'Houston',
    endPoint: 'Philadelphia',
    capacity: 30,
    openSeats: 2,
    filledSeats: 28,
    economyPrice: '$30',
    premiumPrice: '$50',
    businessPrice: '$100',
    departTime: '07:05 AM',
    arrivalTime: '10:35 AM',
    duration: '1 hour'
  },
  {
    busID: 14,
    busName: 'B014',
    startPoint: 'Houston',
    endPoint: 'Columbus',
    capacity: 34,
    openSeats: 0,
    filledSeats: 34,
    economyPrice: '$40',
    premiumPrice: '$80',
    businessPrice: '$120',
    departTime: '06:03 AM',
    arrivalTime: '07:38 AM',
    duration: '2 hours'
  },
  {
    busID: 15,
    busName: 'B015',
    startPoint: 'San Jose',
    endPoint: 'Austin',
    capacity: 40,
    openSeats: 36,
    filledSeats: 4,
    economyPrice: '$35',
    premiumPrice: '$50',
    businessPrice: '$120',
    departTime: '07:48 AM',
    arrivalTime: '10:46 AM',
    duration: '3 hours'
  }
];

function StickyHeadTable() {
  // Get all bus routes
  const [busRoutes, setBusRoutes] = useState([])

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

  useEffect(() => {fetchData();}, []);
  console.log(busRoutes);
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

  const handleEdit = (routeId) => {
    // Handle edit logic here
    console.log('Edit:', routeId);
  };

  const handleDelete = (routeId) => {
    // Handle delete logic here
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
            {busRoutes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
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
                      onClick={() => handleEdit(row.id)}
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
                    onClick={() => handleDelete(row.id)}
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
        count={rows.length}
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
  busID: '',
  busName: '',
  startPoint: '',
  endPoint: '',
  capacity: '',
  openSeats: '',
  filledSeats: '',
  economyPrice: '',
  premiumPrice: '',
  businessPrice: '',
  departTime: '',
  arrivalTime: '',
  duration: '',
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

// const formContainerStyle = {
//   display: 'flex',
//   flexWrap: 'wrap', // Allow the cards to wrap to the next line on smaller screens
//   gap: '30px', // Space between cards
//   justifyContent: 'left', // Center cards in the container
//   padding: '0px',
// };

// const cardStyle = {
//   display: 'flex',
//   flexDirection: 'column', // Stack elements vertically inside the card
//   alignItems: 'center', // Center items for better aesthetics
//   padding: '20px',
//   borderRadius: '8px', // Rounded corners for the card
//   boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow for depth
//   backgroundColor: '#E5E1DA', // Card background color
//   width: '32%', // Responsive width with gap consideration
//   minWidth: '325px', // Max width for larger screens
// };

// const formContainerStyle = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(2, 1fr)', // Two columns layout
//   columnGap: '20px', // Space between columns
//   rowGap: '15px', // Space between rows
//   alignItems: 'start', // Align items to the start of the grid cell
//   maxWidth: '800px', // Adjust based on the actual size needed
//   margin: '0 auto', // Center the form horizontally
//   padding: '20px',
// };

// // Adjusted input style to remove margin-bottom
// const inputStyle = {
//   // ... other styles remain the same
//   marginBottom: '0', // Remove margin-bottom
// };

// // Add a new style for grid items that span two columns
// const gridColumnSpanStyle = {
//   gridColumn: '1 / -1', // Span from first to last column
// };

// // Style for buttons and actions on the side or bottom
// const actionButtonStyle = {
//   // ... your button styles,
//   gridColumn: '2', // Position on the second column
//   justifySelf: 'start', // Align to the start of the grid cell
// };

// // If you have a section that should be on the side or have different alignment
// const sideSectionStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '10px',
//   // ... add more styles as needed
// };


const ManageBusRoutes = () => {
  const [currentTab, setCurrentTab] = useState('list'); // 'list', 'create'
  // For create/Edit //////////////////
  const [routeForm, setRouteForm] = useState(initialRouteFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRouteForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submission', routeForm);
    // Here you would handle the form submission to either create or update a route
    // After submission, reset form and switch tab or display success message
    setRouteForm(initialRouteFormState);
    setCurrentTab('list'); // Optional: redirect to list after submission
  };
  ///////////////////////////////////

  const getTabButtonStyle = (tab) => ({
    ...tabButtonStyle,
    ...(currentTab === tab ? activeTabStyle : {}),
  });

  // Function to switch tabs
  const switchTab = (tab) => {
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
        <li style={getTabButtonStyle('list')} onClick={() => switchTab('list')}>Route Listing</li>
        <li style={getTabButtonStyle('create')} onClick={() => switchTab('create')}>Create Route</li>
        {/* <li style={getTabButtonStyle('stats')} onClick={() => switchTab('stats')}>Passenger Statistics</li> */}
      </ul>

      <div style={contentStyle}>
        {currentTab === 'list' && (
          <TableContainer component={Paper} sx={tableContainerSx}>
            <StickyHeadTable />
          </TableContainer>
        )}
        {/* Include your forms and statistics content with appropriate styles */}
        {/* Create/Edit Route Form  */}
        {currentTab === 'create' && (
          <div style={contentStyle}>
            <h2>Create Route</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
              <label style={labelStyle}>Bus Name</label>
              <input style={inputStyle} type="text" name="busName" value={routeForm.busName} onChange={handleChange} placeholder="Enter Bus Name" />
              <label style={labelStyle}>Bus Number</label>
              <input style={inputStyle} type="text" name="busNumber" value={routeForm.busNumber} onChange={handleChange} placeholder="Enter Bus Number" />
              <label style={labelStyle}>Start Point</label>
              <input style={inputStyle} type="text" name="startPoint" value={routeForm.startPoint} onChange={handleChange} placeholder="Start Point" />
              <label style={labelStyle}>End Point</label>
              <input style={inputStyle} type="text" name="endPoint" value={routeForm.endPoint} onChange={handleChange} placeholder="End Point" />
              <label style={labelStyle}>Total Seats</label>
              <input style={inputStyle} type="number" name="capacity" value={routeForm.capacity} onChange={handleChange} placeholder="Total Seats" />
              <label style={labelStyle}>Available Seats</label>
              <input style={inputStyle} type="number" name="openSeats" value={routeForm.openSeats} onChange={handleChange} placeholder="Available Seats" />
              <label style={labelStyle}>Booked Seats</label>
              <input style={inputStyle} type="number" name="filledSeats" value={routeForm.filledSeats} onChange={handleChange} placeholder="Booked Seats" />
              <label style={labelStyle}>Economy Price</label>
              <input style={inputStyle} type="text" name="economyPrice" value={routeForm.economyPrice} onChange={handleChange} placeholder="Economy Price" />
              <label style={labelStyle}>Premium Price</label>
              <input style={inputStyle} type="text" name="premiumPrice" value={routeForm.premiumPrice} onChange={handleChange} placeholder="Premium Price" />
              <label style={labelStyle}>Business Price</label>
              <input style={inputStyle} type="text" name="businessPrice" value={routeForm.businessPrice} onChange={handleChange} placeholder="Business Price" />
              <label style={labelStyle}>Depart Time</label>
              <input style={inputStyle} type="text" name="departTime" value={routeForm.departTime} onChange={handleChange} placeholder="Depart Time" />
              <label style={labelStyle}>Arrival Time</label>
              <input style={inputStyle} type="text" name="arrivalTime" value={routeForm.arrivalTime} onChange={handleChange} placeholder="Arrival Time" />
              <label style={labelStyle}>Duration</label>
              <input style={inputStyle} type="text" name="duration" value={routeForm.duration} onChange={handleChange} placeholder="Duration" />
              <button type="submit" style={buttonStyle}><FaSave /> Save Route</button>
            </form>
            {/**?ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd */}
            {/* <form onSubmit={handleSubmit}>
              <div style={formContainerStyle}>
                {/* Repeat this structure for each form field 
                <div style={cardStyle}>
                  <label style={labelStyle}>Bus ID</label>
                  <input style={inputStyle} type="text" name="busNumber" value={routeForm.busID} onChange={handleChange} placeholder="Enter Bus ID" />
                  <label style={labelStyle}>Bus Name</label>
                  <input style={inputStyle} type="text" name="busName" value={routeForm.busName} onChange={handleChange} placeholder="Enter Bus Name" />
                  <label style={labelStyle}>Start Point</label>
                  <input style={inputStyle} type="text" name="startPoint" value={routeForm.startPoint} onChange={handleChange} placeholder="Start Point" />
                  <label style={labelStyle}>End Point</label>
                  <input style={inputStyle} type="text" name="endPoint" value={routeForm.endPoint} onChange={handleChange} placeholder="End Point" />
                </div>

                {/* Continue with other fields following the same pattern 
                <div style={cardStyle}>
                  <label style={labelStyle}>Total Seats</label>
                  <input style={inputStyle} type="number" name="capacity" value={routeForm.capacity} onChange={handleChange} placeholder="Total Seats" />
                  <label style={labelStyle}>Available Seats</label>
                  <input style={inputStyle} type="number" name="openSeats" value={routeForm.openSeats} onChange={handleChange} placeholder="Available Seats" />
                  <label style={labelStyle}>Booked Seats</label>
                  <input style={inputStyle} type="number" name="filledSeats" value={routeForm.filledSeats} onChange={handleChange} placeholder="Booked Seats" />
                  <label style={labelStyle}>Economy Price</label>
                  <input style={inputStyle} type="text" name="economyPrice" value={routeForm.economyPrice} onChange={handleChange} placeholder="Economy Price" />
                  <label style={labelStyle}>Premium Price</label>
                  <input style={inputStyle} type="text" name="premiumPrice" value={routeForm.premiumPrice} onChange={handleChange} placeholder="Premium Price" />
                  <label style={labelStyle}>Business Price</label>
                  <input style={inputStyle} type="text" name="businessPrice" value={routeForm.businessPrice} onChange={handleChange} placeholder="Business Price" />
                </div>

                <div style={cardStyle}>
                  <label style={labelStyle}>Depart Time</label>
                  <input style={inputStyle} type="text" name="departTime" value={routeForm.departTime} onChange={handleChange} placeholder="Depart Time" />
                  <label style={labelStyle}>Arrival Time</label>
                  <input style={inputStyle} type="text" name="arrivalTime" value={routeForm.arrivalTime} onChange={handleChange} placeholder="Arrival Time" />
                  <label style={labelStyle}>Duration</label>
                  <input style={inputStyle} type="text" name="duration" value={routeForm.duration} onChange={handleChange} placeholder="Duration" />
                </div>

                
                {/* For the submit button, consider placing it outside the flex container or inside its own card for alignment 
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                  <button type="submit" style={buttonStyle}><FaSave /> Save Route</button>
                </div>
              </div>
            </form> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBusRoutes;
