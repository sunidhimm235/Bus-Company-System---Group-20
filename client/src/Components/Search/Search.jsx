import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

// Impported icons
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {RxCalendar} from 'react-icons/rx'

// import AOS
import Aos from 'aos'
import 'aos/dist/aos.css'

// This part should be completed by Sunidhi & Lucas

// Things to do on this component are:
// - Create a pop up for the search bar with the destinations
// - Create a pop up for the date picker
// - The pop up should be able to close when clicked outside of it
// - The pop up search should be able to filter the destinations when typing
// - Upon clicking on the search button, it should take you to the bus schedule page
// - ..continued^^ It should be able to pass the data inputted to the bus schedule page

const Search = () => {

    useEffect(()=>
    {
        Aos.init({duration: 2000})
    },
    [])

    const [activeButton, setActiveButton] = useState('Business Class');

    const handleButtonClick = (buttonName) =>
    {
        setActiveButton(buttonName);
    };

    return (
        <div className='search container section'>
            <div data-aos="fade-up" data-aos-duration="2500" className="sectionContainer grid">
                <div  className="btns flex">
                    <div 
                        className={`singleBtn ${activeButton === 'Economy' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('Economy')}
                    >
                        <span>Economy</span>
                    </div>
                    <div 
                        className={`singleBtn ${activeButton === 'Business Class' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('Business Class')}
                    >
                        <span>Business Class</span>
                    </div>
                    <div 
                        className={`singleBtn ${activeButton === 'Fast Class' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('Fast Class')}
                    >
                        <span>First Class</span>
                    </div>
                </div>

                <div  data-aos="fade-up" data-aos-duration="2500" className="searchInputs flex">
                        <div className="singleInput flex">
                            <div className="iconDiv">
                                <HiOutlineLocationMarker className='icon'/>
                            </div>
                            <div className="texts">
                                <h4>Depart</h4>
                                <input type="text" placeholder='Leave from?'/>
                            </div>
                        </div>

                        <div className="singleInput flex">
                            <div className="iconDiv">
                                <HiOutlineLocationMarker className='icon'/>
                            </div>
                            <div className="texts">
                                <h4>Arrive</h4>
                                <input type="text" placeholder='Go to?'/>
                            </div>
                        </div>

                        <div className="singleInput flex">
                            <div className="iconDiv">
                                <RxCalendar className='icon'/>
                            </div>
                            <div className="texts">
                                <h4>Date</h4>
                                <input type="text" placeholder='MM/DD/YYYY'/>
                            </div>
                        </div>

                        <Link to="/bus-schedule"><button className='btn btnBlock flex'>Search</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Search