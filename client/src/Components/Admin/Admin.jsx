import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar'; // Adjust the import path as needed
import DashboardCards from './DashboardCards';

const Admin = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard'); // Default to showing Dashboard

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar onSelect={handleSelectItem} />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        {/* Conditionally render content based on selectedItem */}
        {selectedItem === 'Dashboard' && (
          <div>
            <h1>Dashboard</h1>
            <DashboardCards />
            {/* Dashboard content */}
          </div>
        )}
        {selectedItem === 'Manage Bus Routes' && (
          <div>
            <h1>Manage Bus Routes</h1>
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
            {/* Content for managing bus routes */}
          </div>
        )}
        {selectedItem === 'Bookings' && (
          <div>
            <h1>Bookings</h1>
            {/* Content for managing bus routes */}
          </div>
        )}
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