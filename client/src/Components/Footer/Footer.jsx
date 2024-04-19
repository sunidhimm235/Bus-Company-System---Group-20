import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import Aos from 'aos'
import 'aos/dist/aos.css'

// Imported icons
import {TiSocialFacebook} from 'react-icons/ti'
import {AiOutlineTwitter} from 'react-icons/ai'
import {AiFillYoutube} from 'react-icons/ai'
import {FaPinterestP} from 'react-icons/fa'

//Imported Images
import Logo from '../../assets/logo.png'

const Footer = () =>
{
	useEffect(()=>
	{
		Aos.init({duration: 2000})
	},
	[])

	return (
		<div className='footer'>

			<div className="sectionContainer container grid">

				<div data-aos="fade-up" data-aos-duration="2500" className="gridOne grid">
					<div className="logoDiv">
						<img src={Logo} className='Logo' alt=""/>
					</div>
					<p>Hope you have a great experience with us.</p>
					<div className="socialIcons flex">
						<TiSocialFacebook className='icon'/>
						<AiOutlineTwitter className='icon'/>
						<AiFillYoutube className='icon'/>
						<FaPinterestP className='icon'/>
					</div>
				</div>

				<div data-aos="fade-up" data-aos-duration="2500" className="footerLinks">
					<span className="linkTitle">Information</span>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to='/destination'>Destinations</Link>
					</li>
					<li>
						<a href="#">Book Ticket</a>
					</li>
					<li>
						<Link to='/reservations'>Reservations</Link>
					</li>
					<li>
						<Link href="/contact">Contact</Link>
					</li>
				</div>

				<div data-aos="fade-up" data-aos-duration="2500" className="footerLinks">
					<span className="linkTitle">Quick Guide</span>
					<li>
						<Link to="/howto">How to</Link>
					</li>
					<li>
						<Link to="/baggage">Baggage</Link>
					</li>
					<li>
						<Link to="/features">Bus Features</Link>
					</li>
					<li>
						<Link to="/rights&rules">Rights & Rules</Link>
					</li>
					<li>
						<Link href="/faq">FAQ</Link>
					</li>
				</div>

				<div data-aos="fade-up" data-aos-duration="2500" className="footerLinks">
					<span className='linkTitle'>Company</span>
					<li>
						{/* Open link in new tab */}
						<a href="/admin" target="_blank" rel="noreferrer">Administrator</a>
					</li>
					<li>
						<a href="/employee" target="_blank" rel="noreferrer">Employee</a>
					</li>
				</div>
			</div>

			<div className="copyrightDiv flex">
				<p>Developed by Group 20 - Sunidhi Mistry, Lucas Assuncao Carvalho, Pakin Ngamkam, Nicholas Heikes and Adam Elias</p>
			</div>
		
		</div>
	)
}

export default Footer