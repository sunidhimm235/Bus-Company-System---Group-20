// import React, { useState, useEffect } from 'react';
// // Import your icons and logo here
// import { ReactComponent as YourLogo } from '../../assets/logo.svg';
// import { ReactComponent as DashboardIcon } from '../../assets/logo.svg'; // Example icon
// import { ReactComponent as ManageBusRoutesIcon } from '../../assets/logo.svg'; // Example icon
// // Add more icons as needed

// const SidebarItem = ({ icon, label, isExpanded }) => {
//     const [isHovered, setIsHovered] = useState(false);
  
//     const itemStyle = {
//       display: 'flex',
//       alignItems: 'center',
//       marginBottom: '10px',
//       cursor: 'pointer',
//       backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
//       padding: '10px',
//       borderRadius: '5px',
//       transition: 'background-color 0.3s ease',
//     };
  
//     return (
//       <div
//         style={itemStyle}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div style={{ marginRight: isExpanded ? '10px' : '0', width: '24px', height: '24px' }}>
//           {icon}
//         </div>
//         {isExpanded && <span>{label}</span>}
//       </div>
//     );
//   };
  
//   const AdminSidebar = () => {
//     const [isExpanded, setIsExpanded] = useState(true); // State to manage sidebar expansion
  
//     useEffect(() => {
//       const handleResize = () => {
//         if (window.innerWidth <= 768) {
//           setIsExpanded(false);
//         } else {
//           setIsExpanded(true);
//         }
//       };
  
//       window.addEventListener('resize', handleResize);
//       handleResize();
  
//       return () => window.removeEventListener('resize', handleResize);
//     }, []);
  
//     const toggleSidebar = () => {
//       setIsExpanded(!isExpanded);
//     };
  
//     return (
//       <div style={{
//         width: isExpanded ? '250px' : '80px',
//         minHeight: '100vh',
//         background: '#333',
//         padding: isExpanded ? '20px' : '20px 10px',
//         transition: 'width 0.3s ease',
//       }}>
//         <div style={{ marginBottom: '20px', textAlign: 'center' }}>
//           <YourLogo style={{ width: isExpanded ? '' : '50px', height: 'auto' }} />
//         </div>
//         <div onClick={toggleSidebar} style={{ marginBottom: '20px', cursor: 'pointer' }}>
//           {/* Menu button icon or text */}
//           {isExpanded ? 'Shrink' : 'Expand'}
//         </div>
//         {/* Sidebar items */}
//         <SidebarItem icon={<DashboardIcon />} label="Dashboard" isExpanded={isExpanded} />
//         <SidebarItem icon={<ManageBusRoutesIcon />} label="Manage Bus Routes" isExpanded={isExpanded} />
//         {/* Add more SidebarItem components as needed */}
//       </div>
//     );
//   };
  
//   export default AdminSidebar;

import React, { useState, useEffect } from 'react';
// Import your icons and logo here
import { ReactComponent as YourLogo } from '../../assets/WhiteLogo.svg';
import { MdDashboard, MdMap, MdSchedule, MdAccountCircle, MdBookOnline, MdBarChart, MdExitToApp } from 'react-icons/md';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

// Add more icons as needed

const SidebarItem = ({ icon, label, isExpanded, onSelect }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    const itemStyle = {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
      cursor: 'pointer',
      backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
      padding: '10px',
      paddingLeft: isHovered ? '15px' : '10px',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
      color: 'white',
    };

    const iconStyle = {
        marginRight: isExpanded ? '10px' : '0', // Adjust spacing between icon and text based on expansion.
        width: '24px', // Adjust as needed or use icon props for dynamic sizing.
        height: '24px', // Maintain aspect ratio.
        display: 'flex', // Use flex to help with alignment.
        alignItems: 'center', // Center align the icon vertically.
      };
  
    return (
      <div
        style={itemStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onSelect(label)} // Call onSelect with the label when clicked
      >
        <div style={iconStyle}>
          {icon}
        </div>
        {isExpanded && <span>{label}</span>}
      </div>
    );
};

const AdminSidebar = ({ onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsExpanded(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
      width: isExpanded ? '250px' : '80px',
      background: '#001A37',
      padding: isExpanded ? '20px' : '20px 10px',
      transition: 'width 0.3s ease',
    }}>
      {/* Top section for logo, toggle, and sidebar items */}
      <div>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <YourLogo style={{ width: isExpanded ? '150px' : '50px', height: 'auto' }} />
        </div>
        <div onClick={toggleSidebar} style={{ color: 'white', cursor: 'pointer', textAlign: 'right', marginBottom: '20px' }}>
            {isExpanded ? <MdChevronLeft size={24} /> : <MdChevronRight size={24} />}
        </div>
        <SidebarItem icon={<MdDashboard  size={30} />} label="Dashboard" isExpanded={isExpanded} onSelect={onSelect} />
        <SidebarItem icon={<MdMap size={30} />} label="Manage Bus Routes" isExpanded={isExpanded} onSelect={onSelect} />
        <SidebarItem icon={<MdSchedule size={30} />} label="Manage Bus Schedules" isExpanded={isExpanded} onSelect={onSelect} />
        <SidebarItem icon={<MdAccountCircle size={30} />} label="Manage User Accounts" isExpanded={isExpanded} onSelect={onSelect} />
        <SidebarItem icon={<MdBookOnline size={30} />} label="Bookings" isExpanded={isExpanded} onSelect={onSelect} />
        <SidebarItem icon={<MdBarChart size={30} />} label="Reports" isExpanded={isExpanded} onSelect={onSelect} />
      </div>
      {/* Bottom section for logout */}
      <div style={{ textAlign: 'center', marginBottom: '0px', marginTop: 'auto'  }}>
        <SidebarItem icon={<MdExitToApp size={30} />} label="Logout" isExpanded={isExpanded} onSelect={onSelect}/>
      </div>
    </div>
  );
};

export default AdminSidebar;
