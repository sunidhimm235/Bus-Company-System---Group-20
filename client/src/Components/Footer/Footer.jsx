import React, {useEffect} from 'react'
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
						<a href="#">Home</a>
					</li>
					<li>
						<a href="/destination">Destinations</a>
					</li>
					<li>
						<a href="#">Book Ticket</a>
					</li>
					<li>
						<a href="#">Reservations</a>
					</li>
				</div>

				<div data-aos="fade-up" data-aos-duration="2500" className="footerLinks">
					<span className="linkTitle">Quick Guide</span>
					<li>
						<a href="/howto">How to</a>
					</li>
					<li>
						<a href="/baggage">Baggage</a>
					</li>
					<li>
						<a href="/features">Bus Features</a>
					</li>
					<li>
						<a href="/rights&rules">Rights & Rules</a>
					</li>
				</div>

				<div data-aos="fade-up" data-aos-duration="2500" className="footerLinks">
					<span className="linkTitle">Queries</span>
					<li>
						<a href="/faq">FAQ</a>
					</li>
					<li>
						<a href="/contact">Contact</a>
					</li>
				</div>
			</div>

			<div className="copyrightDiv flex">
				<p><a>Developed by Group 20 - Sunidhi Mistry, Adam Elias, Lucas Assuncao Carvalho, Pakin Ngamkam, and Nicholas Heikes</a></p>
			</div>
		
		</div>
	)
}

export default Footer