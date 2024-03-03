import React, {useState} from 'react'
import { Link } from 'react-router-dom';

// Imported Icons
import {SiConsul} from 'react-icons/si'
import {BsPhoneVibrate} from 'react-icons/bs'
import {AiOutlineGlobal} from 'react-icons/ai'
import {CgMenuGridO} from 'react-icons/cg'

// Imported Images
import Logo from '../../assets/logo.png'

const Navbar = () =>
{
    // Toggle the navbar menu
    const [active, setActive] = useState('navBarMenu')
    const  showNavBar = ()=>
    {
        setActive('navBarMenu showNavBar')
    }

    // Remove the navbar menu
    const  removeNavBar = ()=>{
        setActive('navBarMenu')
    }

    // Change the navbar color
    const [transparent, setTransparent] = useState('navBarTwo')
    const addBg = ()=>
    {
        if(window.scrollY >= 10)
        {
            setTransparent('navBarTwo activeHeader')
        }
        else
        {
            setTransparent('navBarTwo')
        }
    }
    window.addEventListener('scroll', addBg)


    return (
        <div className='navBar flex'>
            <div className="navBarOne flex">
                <div><SiConsul className='icon'/></div>
                <div className='none flex'>
                    <li className='flex'> TicketRide | Your Travel Partner</li>
                    <li className='flex'><BsPhoneVibrate className='icon'/> +234 123 456 7890</li>
                </div>
                <div className='atb flex'>
                    {/* <span> Sign In</span>
                    <span> Sign Up</span> */}
                    <Link to="/sign-in"><span>Sign In</span></Link>
                    <Link to="/sign-up"><span>Sign Up</span></Link>
                </div>
            </div>

            <div className={transparent}>
                <div className="logoDiv">
                    <img src={Logo} className='Logo' />
                </div>

                <div className={active}>
                    <ul className="menu flex">
                        <li onClick={removeNavBar} className="listItem">Home</li>
                        <li onClick={removeNavBar} className="listItem">About</li>
                        <li onClick={removeNavBar} className="listItem">FAQ</li>
                        <li onClick={removeNavBar} className="listItem">Destinations</li>
                    </ul>
                    
                    <button onClick={removeNavBar} className='btn btnOne flex'>
                        Contact
                    </button>
                </div>

                <button className='btnTwo btn'>
                    Contact
                </button>

                <div onClick = {
                    active === 'navBarMenu' ? showNavBar : removeNavBar
                } className="toggleIcon">
                    <CgMenuGridO className='icon'/>
                </div>
            </div>

        </div>
    )
}

export default Navbar