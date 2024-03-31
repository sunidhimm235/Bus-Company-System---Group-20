import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar'; // Adjust the import path as needed
import DashboardCards from './DashboardCards';
import ManageBusRoutes from './ManageBusRoutes';
import ManageUserAccounts from './ManageUserAccounts';

const Admin = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard'); // Default to showing Dashboard
  const [isExpanded, setIsExpanded] = useState(true); // State moved here

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar onSelect={handleSelectItem} isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
      <div style={{ 
        flexGrow: 1, 
        padding: '20px',
        marginLeft: isExpanded ? '250px' : '80px' // Adjust based on your sidebar's width
        }}>
        {/* Conditionally render content based on selectedItem */}
        {selectedItem === 'Dashboard' && (
          <div>
            <h1>Dashboard</h1>
            <div style={{padding: '10px'}}></div>
            <DashboardCards />
            {/* Dashboard content */}
          </div>
        )}
        {selectedItem === 'Manage Bus Routes' && (
          <div>
            <h1>Manage Bus Routes</h1>
            <div style={{padding: '10px'}}></div>
            <ManageBusRoutes />
            {/* Content for managing bus routes */}
          </div>
        )}
        {/* Repeat for other sections based on your sidebar items */}
        {selectedItem === 'Manage Bus Schedules' && (
          <div>
            <h1>Manage Bus Schedules</h1>
            {/* Content for managing bus routes */}
          </div>
        )}
        {selectedItem === 'Manage User Accounts' && (
          <div>
            <h1>Manage User Accounts</h1>
            <div style={{padding: '10px'}}></div>
            <ManageUserAccounts />
            {/* Content for managing bus routes */}
          </div>
        )}
        {/* {selectedItem === 'Bookings' && (
          <div>
            <h1>Bookings</h1>
            
          </div>
        )} */}
        {selectedItem === 'Reports' && (
          <div>
            <h1>Reports</h1>
            {/* Content for managing bus routes */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;