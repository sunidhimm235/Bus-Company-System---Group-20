import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SiConsul } from 'react-icons/si';
import { BsPhoneVibrate } from 'react-icons/bs';
import { CgMenuGridO } from 'react-icons/cg';
import Logo from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';
import { FaChevronDown } from 'react-icons/fa';


const Navbar = () => {
    const [active, setActive] = useState('navBarMenu');
    const [transparent, setTransparent] = useState('navBarTwo');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showTravelInfoDropdown, setShowTravelInfoDropdown] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const toggleNavBar = () => setActive(prev => prev === 'navBarMenu' ? 'navBarMenu showNavBar' : 'navBarMenu');
    const addBg = () => setTransparent(window.scrollY >= 10 ? 'navBarTwo activeHeader' : 'navBarTwo');

    useEffect(() => {
        window.addEventListener('scroll', addBg);
        return () => window.removeEventListener('scroll', addBg);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const dropdownStyles = {
        position: 'absolute',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: '10px',
        borderRadius: '5px',
        top: '100%',
        right: 0,
        zIndex: 1000,
    };

    const dropdownItemStyles = {
        padding: '8px 10px',
        cursor: 'pointer',
    };

    return (
        <div className='navBar flex'>
            <div className="navBarOne flex">
                <div><SiConsul className='icon'/></div>
                <div className='none flex'>
                    <li className='flex'>TicketRide | Your Travel Partner</li>
                    <li className='flex'><BsPhoneVibrate className='icon'/> +234 123 456 7890</li>
                </div>
                <div className='atb flex'>
                    {user ? (
                        <div style={{ position: 'relative' }} onMouseLeave={() => setShowDropdown(false)}>
                            <span onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: 'pointer' }}>
                                {user.username}
                            </span>
                            {showDropdown && (
                                <div style={dropdownStyles}>
                                    <Link to="/travel-history"><div style={dropdownItemStyles}>Travel History</div></Link>
                                    <Link to="/reservations"><div style={dropdownItemStyles}>Reservations</div></Link>
                                    <div onClick={handleLogout} style={dropdownItemStyles}>Log Out</div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/sign-in"><span>Sign In</span></Link>
                            <Link to="/sign-up"><span>Sign Up</span></Link>
                        </>
                    )}
                </div>
            </div>
            <div className={transparent}>
                <div className="logoDiv">
                    <img src={Logo} alt="Logo" className='Logo' />
                </div>

                <div className={active}>
                    <ul className="menu flex">
                        <Link to="/"><li className="listItem">Home</li></Link>
                        <li
                            className="listItem"
                            onClick={() => setShowTravelInfoDropdown(!showTravelInfoDropdown)} // Toggle the dropdown on click
                            style={{ position: 'relative' }} // Add relative position to the list item
                        >
                            Travel Info
                            {showTravelInfoDropdown && (
                                <div style={dropdownStyles}>
                                    <Link to="/howto">
                                        <div style={{ ...dropdownItemStyles, color: 'grey' }}>How To</div>
                                    </Link>
                                    <Link to="/baggage">
                                        <div style={{ ...dropdownItemStyles, color: 'grey' }}>Baggage Info</div>
                                    </Link>
                                    <Link to="/features">
                                        <div style={{ ...dropdownItemStyles, color: 'grey' }}>Bus Features</div>
                                    </Link>
                                    <Link to="/rights&rules">
                                        <div style={{ ...dropdownItemStyles, color: 'grey' }}>Rights and Rules</div>
                                    </Link>
                                </div>
                            )}
                        </li>
                        <Link to="/faq"><li className="listItem">FAQ</li></Link>
                        <Link to="/destination"><li className="listItem">Destinations</li></Link>
                    </ul>
                    
                    <Link to="/contact"><button className='btn btnOne flex'>Contact</button></Link>
                </div>

                <Link to="/contact"><button className='btnTwo btn'>Contact</button></Link>

                <div onClick={toggleNavBar} className="toggleIcon">
                    <CgMenuGridO className='icon'/>
                </div>
            </div>
        </div>
    );
};

export default Navbar;