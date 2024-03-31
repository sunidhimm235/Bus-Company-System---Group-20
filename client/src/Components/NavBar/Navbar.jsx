import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth'; // Adjust the import path as necessary

import { SiConsul } from 'react-icons/si';
import { BsPhoneVibrate } from 'react-icons/bs';
import { CgMenuGridO } from 'react-icons/cg';
import Logo from '../../assets/logo.png';

const Navbar = () => {
    const [active, setActive] = useState('navBarMenu');
    const [transparent, setTransparent] = useState('navBarTwo');
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const toggleNavBar = () => setActive(prevState => prevState === 'navBarMenu' ? 'navBarMenu showNavBar' : 'navBarMenu');
    const addBg = () => setTransparent(window.scrollY >= 10 ? 'navBarTwo activeHeader' : 'navBarTwo');

    useEffect(() => {
        const handleScroll = () => addBg();
        window.addEventListener('scroll', handleScroll);

        const checkAuthStatus = () => {
            setIsLoggedIn(isAuthenticated());
            setUsername(localStorage.getItem('username') || '');
        };
        checkAuthStatus();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username'); 
        setIsLoggedIn(false);
        setUsername('');
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
        zIndex: 1000, // Ensure dropdown is above other content
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
                    {isLoggedIn ? (
                        <div style={{ position: 'relative' }} onMouseLeave={() => setShowDropdown(false)}>
                            <span onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: 'pointer' }}>
                                {username}
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
                        <Link to="/travel-information"><li className="listItem">Travel Info</li></Link>
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