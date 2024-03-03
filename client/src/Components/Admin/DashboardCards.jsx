// DashboardCards.jsx
import React from 'react';
// Ensure you import the logo or any icons used inside the Card components
import logo from '../../assets/logo.svg'; // Adjust the path as needed

const Card = ({ number, title, icon, bgColor, borderColor }) => {
  const cardStyle = {
    backgroundColor: bgColor || '#F0F0F0',
    borderColor: borderColor || 'transparent',
    borderWidth: borderColor ? '1px' : '0',
    borderStyle: 'solid',
    padding: '30px',
    borderRadius: '10px',
    color: 'black',
    marginBottom: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <div style={cardStyle}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{number}</h2>
        <p>{title}</p>
      </div>
      <div>
        {icon}
      </div>
    </div>
  );
};

const DashboardCards = () => {
  return (
    <div className="cardContainer">
      {/* Card instances */}
      <Card 
        number="56" 
        title="Total Buses" 
        icon={<img src={logo} alt="Bus Icon" style={{ width: '100px', height: '100px' }} />} 
        bgColor="#FFFADD" 
        borderColor="#FFD700"
      />
      {/* Include other Card instances as before */}
    </div>
  );
};

export default DashboardCards;
