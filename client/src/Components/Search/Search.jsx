import React, {useEffect, useState} from 'react'

// Impported icons
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {RxCalendar} from 'react-icons/rx'

// import AOS
import Aos from 'aos'
import 'aos/dist/aos.css'

const Search = () => {

    useEffect(()=>{
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
                        <span>Fast Class</span>
                    </div>
                </div>

                <div  data-aos="fade-up" data-aos-duration="2500" className="searchInputs flex">
                        <div className="singleInput flex">
                            <div className="iconDiv">
                                <HiOutlineLocationMarker className='icon'/>
                            </div>
                            <div className="texts">
                                <h4>Depart</h4>
                                <input type="text" placeholder='Where do you leave from?'/>
                            </div>
                        </div>

                        <div className="singleInput flex">
                            <div className="iconDiv">
                                <HiOutlineLocationMarker className='icon'/>
                            </div>
                            <div className="texts">
                                <h4>Arrive</h4>
                                <input type="text" placeholder='Where do you want to go?'/>
                            </div>
                        </div>

                        <div className="singleInput flex">
                            <div className="iconDiv">
                                <RxCalendar className='icon'/>
                            </div>
                            <div className="texts">
                                <h4>Date</h4>
                                <input type="text" placeholder='Add date'/>
                            </div>
                        </div>

                        <button className='btn btnBlock flex'>Search Flight</button>
                </div>
            </div>
        </div>
    )
}

export default Search