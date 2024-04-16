// EmployeeNavbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/BlueLogo.svg'; // Adjust path as necessary

const EmployeeNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Assuming you handle logout logic here
        console.log("Logging out...");
        navigate('/'); // Adjust as necessary
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#E5E1DA'}}>
            <img src={Logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
            <h1 style={{ flexGrow: 1, textAlign: 'center' }}>Manage Reservations</h1>
            <button onClick={handleLogout} className='btnTwo btn'>Logout</button>
            {/* <button className='btnTwo btn'>Contact</button> */}
        </div>

    );
};

export default EmployeeNavbar;
