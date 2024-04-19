import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar'; // Adjust the import path as needed
import DashboardCards from './DashboardCards';
import ManageBusRoutes from './ManageBusRoutes';
import ManageUserAccounts from './ManageUserAccounts';
import ManageAdminAccounts from './ManageAdminAccounts';
import ManageEmployeeAccounts from './ManageEmployeeAccounts';
import Feedbacks from './Feedbacks';

const Admin = () => {
  const correctPasscode = 'adminAccess123'; // Your hardcoded passcode
  const [passcode, setPasscode] = useState('');
  const [hasAccess, setHasAccess] = useState(false);

  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const checkPasscode = () => {
    if (passcode === correctPasscode) {
      setHasAccess(true);
    } else {
      alert('Incorrect passcode!');
      setPasscode('');
    }
  };

  return (
    <div>
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
            }}>Enter Passcode to Access the Admin Dashboard</h2>
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
      {hasAccess && (<div style={{ display: 'flex', minHeight: '100vh' }}>
        <AdminSidebar onSelect={handleSelectItem} isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
        <div style={{ 
          flexGrow: 1, 
          padding: '20px',
          marginLeft: isExpanded ? '250px' : '80px' // Adjust based on your sidebar's width
          }}>
          {selectedItem === 'Dashboard' && (
            <div>
              <h1>Admin Dashboard</h1>
              <div style={{padding: '10px'}}></div>
              <DashboardCards />
            </div>
          )}
          {selectedItem === 'Manage Bus Routes' && (
            <div>
              <h1>Manage Bus Routes</h1>
              <div style={{padding: '10px'}}></div>
              <ManageBusRoutes />
            </div>
          )}
          {/* Repeat for other sections based on your sidebar items */}
          {selectedItem === 'Manage Employee Accounts' && (
            <div>
              <h1>Manage Employee Accounts</h1>
              <div style={{padding: '10px'}}></div>
              <ManageEmployeeAccounts />
            </div>
          )}
          {selectedItem === 'Manage Admin Accounts' && (
            <div>
              <h1>Manage Admin Accounts</h1>
              <div style={{padding: '10px'}}></div>
              <ManageAdminAccounts />
            </div>
          )}
          {selectedItem === 'Manage User Accounts' && (
            <div>
              <h1>Manage User Accounts</h1>
              <div style={{padding: '10px'}}></div>
              <ManageUserAccounts />
            </div>
          )}
          {selectedItem === 'Feedbacks' && (
              <div>
                <h1>Feedbacks</h1>
                <div style={{padding: '10px'}}></div>
                <Feedbacks />
              </div>
            )}
        </div>
      </div>)}
    </div>
  );
};

export default Admin;