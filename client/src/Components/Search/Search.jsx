import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './Search.css'

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
    const [showPopup, setShowPopup] = useState(false);
    // const [showDatePopup, setShowDatePopup] = useState(false);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState('');
    const popupRef = useRef();

    const cities = useMemo(() => [
        'New York',
        'Orlando',
        'Los Angeles',
        'San Francisco',
        'Las Vegas',
        'Miami',
        'Chicago',
        'Seattle',
        'Boston',
        'Washington D.C.',
        'New Orleans',
        'Denver',
        'San Diego',
        'Houston',
        'Nashville',
        'Atlanta',
        'Philadelphia',
        'Portland',
        'Austin',
        'Dallas',
        'Phoenix',
        'San Antonio',
        'Minneapolis',
        'St. Louis',
        'Kansas City',
        'Cleveland',
        'Cincinnati'
    ], []);

    useEffect(() =>
    {
        const results = cities.filter(city =>
        {
            return city.toLowerCase().includes(search.toLowerCase());
        });
        setFilter(results);
    }, [search, cities]);

    // Close the pop-up when clicking outside of it
    useEffect(() =>
    {
        function handleClickOutside(event)
        {
            if (popupRef.current && !popupRef.current.contains(event.target))
            {
                setShowPopup(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
        {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popupRef]);
    
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
                                <input 
                                    type="text" 
                                    placeholder='Leave from?'
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    onFocus={() => setShowPopup(true)}
                                />
                                {showPopup && (
                                    <div ref={popupRef} className="popup">
                                        {filter.map((destination, index) => (
                                            <div 
                                                key={index} 
                                                onClick={() => {
                                                    setSearch(destination);
                                                    setShowPopup(false);
                                                }}
                                            >
                                                {destination}
                                            </div>
                                        ))}
                                    </div>
                                )}
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