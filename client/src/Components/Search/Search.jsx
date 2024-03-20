import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './Search.css'

// Impported icons
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {RxCalendar} from 'react-icons/rx'

// import AOS
import Aos from 'aos'
import 'aos/dist/aos.css'

// This part should be completed by Sunidhi & Lucas

// Things to do on this component are:
// - Create a pop up for the search bar with the destinations (done)
// - Create a pop up for the date picker (done)
// - The pop up should be able to close when clicked outside of it (done)
// - The pop up search should be able to filter the destinations when typing (done)
// - Upon clicking on the search button, it should take you to the bus schedule page (done)
// - ..continued^^ It should be able to pass the data inputted to the bus schedule page (done)

const Search = () => {

    // AOS init
    useEffect(()=>
    {
        Aos.init({duration: 2000})
    },
    [])

    // State variables
    const [showFromPopup, setShowFromPopup] = useState(false);
    const [fromSearch, setFromSearch] = useState('');
    const [fromFilter, setFromFilter] = useState([]);
    const [showToPopup, setShowToPopup] = useState(false);
    const [toSearch, setToSearch] = useState('');
    const [toFilter, setToFilter] = useState([]);
    const [showDatePopup, setShowDatePopup] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const popupRef = useRef();
    const datePopupRef = useRef();
    const navigate = useNavigate();

    // List of cities
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

    // Filters the cities based on the search input
    useEffect(() =>
    {
        const results = cities.filter(city =>
        {
            return city.toLowerCase().includes(fromSearch.toLowerCase());
        });
        setFromFilter(results);
    }, [fromSearch, cities]);

    // Filters the cities based on the search input
    useEffect(() =>
    {
        const results = cities.filter(city =>
        {
            return city.toLowerCase().includes(toSearch.toLowerCase());
        });
        setToFilter(results);
    }, [toSearch, cities]);

    // Close the pop-up when clicking outside of it for date
    useEffect(() =>
    {
        function handleClickOutside(event)
        {
            if (datePopupRef.current && !datePopupRef.current.contains(event.target)) {
                setShowDatePopup(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
        {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Closes the pop-up when clicking outside of it for from
    useEffect(() =>
    {
        function handleClickOutside(event)
        {
            if (popupRef.current && !popupRef.current.contains(event.target))
            {
                setShowFromPopup(false);
                setShowToPopup(false);
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

    // Handles the search button click event
    const handleSearchClick = () => {
        navigate('/bus-schedule', { state: { from: fromSearch, to: toSearch, date: startDate } });
    };

    return (
        <div className='search container section'>
            <div data-aos="fade-up" data-aos-duration="2500" className="sectionContainer grid">
                <h1>Find your next trip...</h1>

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
                                value={fromSearch}
                                onChange={e => setFromSearch(e.target.value)}
                                onFocus={() => setShowFromPopup(true)}
                            />
                            {showFromPopup && (
                                <div ref={popupRef} className="popup">
                                    {fromFilter.map((destination, index) => (
                                        <div 
                                            key={index} 
                                            onClick={() => {
                                                setFromSearch(destination);
                                                setShowFromPopup(false);
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
                            <input
                                type="text"
                                placeholder='Go to?'
                                value={toSearch}
                                onChange={e => setToSearch(e.target.value)}
                                onFocus={() => setShowToPopup(true)}
                            />
                            {showToPopup && (
                                <div ref={popupRef} className="popup">
                                    {toFilter.map((destination, index) => (
                                        <div 
                                            key={index} 
                                            onClick={() => {
                                                setToSearch(destination);
                                                setShowToPopup(false);
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
                            <RxCalendar className='icon'/>
                        </div>
                        <div className="texts">
                            <h4>Date</h4>
                            <input 
                                type="text"
                                placeholder='MM/DD/YYYY'
                                value={startDate ? startDate.toLocaleDateString() : ''}
                                onFocus={() => setShowDatePopup(true)}
                                readOnly
                            />
                            {showDatePopup && (
                                <div ref={datePopupRef} className="datePopup">
                                    <DatePicker 
                                        selected={startDate}
                                        onChange={date => setStartDate(date)}
                                        inline
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <button 
                        className='btn btnBlock flex'
                        onClick={handleSearchClick}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Search