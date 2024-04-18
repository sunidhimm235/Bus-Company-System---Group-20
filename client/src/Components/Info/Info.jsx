import React, {useEffect} from 'react'

// Impoorted Icons
import {RxCalendar} from 'react-icons/rx'
import {BsBookmarkCheck} from 'react-icons/bs'
import {BsShieldCheck} from 'react-icons/bs'

// import AOS
import Aos from 'aos'
import 'aos/dist/aos.css'

const Info = () =>
{
	useEffect(() =>
	{
		Aos.init({duration: 2000})
  	},
	[])

	return (
		<div className='info section'>
			<div className="infoContainer container">
				<div className="titleDiv flex">
					<h2>Make memories all around the United States</h2>
					<button className='btn'>
						View All
					</button>
					{/* <h2 data-aos="fade-right" data-aos-duration="2500">Make memories all around the United States</h2>
					<button data-aos="fade-left" data-aos-duration="2500" className='btn'>
						View All
					</button> */}
				</div>

				<div className="cardsDiv grid">
					<div data-aos="fade-up" data-aos-duration="2500" className="singleCard grid">
						<div className="iconDiv flex">
							<RxCalendar className='icon'/>
						</div>
						<span className="cardTitle">Book & Relax</span>
						<p>You can also call company to help you out with the check-out process.</p>
					</div>
					<div data-aos="fade-up" data-aos-duration="3500" className="singleCard grid">
						<div className="iconDiv flex colorOne">
							<BsShieldCheck className='icon'/>
						</div>
						<span className="cardTitle">Smart System</span>
						<p>You can see all your reservations at one place, and also cancel them with one click!</p>
					</div>
					<div data-aos="fade-up" data-aos-duration="4500" className="singleCard grid">
						<div className="iconDiv flex colorTwo">
							<BsBookmarkCheck className='icon'/>
						</div>
						<span className="cardTitle">Save More</span>
						<p>Cheapest bus tickets available for you to travel to your favorite destinations.</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Info