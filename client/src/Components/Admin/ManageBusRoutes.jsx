import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaBus, FaUserFriends, FaSave } from 'react-icons/fa';
import axios from 'axios'

const DropdownMenu = ({ onEdit, onDelete }) => {
  return (
    <div className="dropdown-menu">
      <div className="dropdown-item" onClick={onEdit}>Edit</div>
      <div className="dropdown-item" onClick={onDelete}>Delete</div>
    </div>
  );
};

const ActionButton = ({ routeId, onEdit, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef}>
      <button className="action-button" onClick={() => setShowDropdown(!showDropdown)}>
        Actions ▼
      </button>
      {showDropdown && <DropdownMenu onEdit={() => onEdit(routeId)} onDelete={() => onDelete(routeId)} />}
    </div>
  );
};

// Mock data for routes
const mockRoutes = [
  { id: 1, name: 'Route 1', startPoint: 'City A', endPoint: 'City B', distance: '100km', travelTime: '2 hours' },
  { id: 1, name: 'Route 1', startPoint: 'City A', endPoint: 'City B', distance: '100km', travelTime: '2 hours' },
  { id: 1, name: 'Route 1', startPoint: 'City A', endPoint: 'City B', distance: '100km', travelTime: '2 hours' },
  { id: 1, name: 'Route 1', startPoint: 'City A', endPoint: 'City B', distance: '100km', travelTime: '2 hours' },
  { id: 1, name: 'Route 1', startPoint: 'City A', endPoint: 'City B', distance: '100km', travelTime: '2 hours' },
  { id: 1, name: 'Route 1', startPoint: 'City A', endPoint: 'City B', distance: '100km', travelTime: '2 hours' },
  { id: 1, name: 'Route 1', startPoint: 'City A', endPoint: 'City B', distance: '100km', travelTime: '2 hours' },
  { id: 1, name: 'Route 1', startPoint: 'City A', endPoint: 'City B', distance: '100km', travelTime: '2 hours' },
  { id: 1, name: 'Route 1', startPoint: 'City A', endPoint: 'City B', distance: '100km', travelTime: '2 hours' },
  { id: 1, name: 'Route 1', startPoint: 'City A', endPoint: 'City B', distance: '100km', travelTime: '2 hours' },
  { id: 1, name: 'Route 1', startPoint: 'City A', endPoint: 'City B', distance: '100km', travelTime: '2 hours' },
  { id: 1, name: 'Route 1', startPoint: 'City A', endPoint: 'City B', distance: '100km', travelTime: '2 hours' },
  // Add more mock route data as needed
];

const containerStyle = {
  maxWidth: '800px',
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
  backgroundColor: '#f2f2f2',
  margin: 0,
};

const tabButtonStyle = {
  flex: 1,
  padding: '10px',
  cursor: 'pointer',
  textAlign: 'center',
  backgroundColor: '#e7e7e7',
  border: 'none',
  outline: 'none',
  transition: 'background-color 0.3s',
};

const activeTabStyle = {
  backgroundColor: '#ddd',
};

const contentStyle = {
  padding: '20px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thTdStyle = {
  padding: '8px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

// For create/Edit
const initialRouteFormState = { name: '', startPoint: '', endPoint: '', distance: '', travelTime: '' };

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
};
  
const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%', // Adjust as needed
};
  
const inputStyle = {
    width: '100%', // Adjust as needed
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
};
  
const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const ManageBusRoutes = () => {
  const [busRoutes, setBusRoutes] = useState([])

  const fetchData = async () => {
		try {
			const response = await axios.get(`http://localhost:4000/buses/`);
			setBusRoutes(response.data);
		}
		catch (error) {
			console.error('Error fetching data:', error);
		}
	};

  useEffect(() => {fetchData();}, []);

  console.log(busRoutes);

  const [currentTab, setCurrentTab] = useState('list'); // 'list', 'create', 'stats'
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

  // Actions button ////////////////
  const handleEdit = (routeId) => {
    console.log(`Editing route ${routeId}`);
    // Implement your edit logic here
  };

  const handleDelete = (routeId) => {
    console.log(`Deleting route ${routeId}`);
    // Implement your delete logic here
  };
  ////////////////////////////////////

  return (
    <div style={containerStyle}>
      <ul style={tabStyle}>
        <li style={getTabButtonStyle('list')} onClick={() => switchTab('list')}>Route Listing</li>
        <li style={getTabButtonStyle('create')} onClick={() => switchTab('create')}>Create Route</li>
        <li style={getTabButtonStyle('stats')} onClick={() => switchTab('stats')}>Passenger Statistics</li>
      </ul>

      <div style={contentStyle}>
        {currentTab === 'list' && (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thTdStyle}>Bus Name</th>
                <th style={thTdStyle}>Start Point</th>
                <th style={thTdStyle}>End Point</th>
                <th style={thTdStyle}>Distance</th>
                <th style={thTdStyle}>Duration</th>
                <th style={thTdStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockRoutes.map((route) => (
                <tr key={route.id}>
                  <td style={thTdStyle}>{route.name}</td>
                  <td style={thTdStyle}>{route.startPoint}</td>
                  <td style={thTdStyle}>{route.endPoint}</td>
                  <td style={thTdStyle}>{route.distance}</td>
                  <td style={thTdStyle}>{route.travelTime}</td>
                  <td style={thTdStyle}>
                    <ActionButton
                      routeId={route.id}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Include your forms and statistics content with appropriate styles */}
        {/* Create/Edit Route Form */}
        {currentTab === 'create' && (
            <div style={contentStyle}>
                <h2>Create Route</h2>
                <form onSubmit={handleSubmit} style={formStyle}>
                    {/* Route name */}
                        <label style={labelStyle}>Bus Name</label>
                        <input
                        style={inputStyle}
                        type="text"
                        name="name"
                        value={routeForm.name}
                        onChange={handleChange}
                        placeholder="Enter Bus Name"
                    />
                    {/* Start point */}
                    {/* Similar input fields for startPoint, endPoint, distance, and travelTime */}
                    <button type="submit" style={buttonStyle}><FaSave /> Save Route</button>
                </form>
            </div>
        )}
      </div>
    </div>
  );
};

export default ManageBusRoutes;
