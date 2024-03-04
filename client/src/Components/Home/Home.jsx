import React from 'react'

//Imported Images
import citylights from '../../assets/Photo1.png'

const Home = () =>
{
	return (
		<div className='home flex container'>
			<div className="mainText">
					<h1>Book Your Next Trip With Us!</h1>
			</div> 
			<div className="homeImages flex">
				<div className="HomePhoto">
					<img src={citylights} className="photo1" alt="bus-scenary" />
				</div>
			</div>
		</div>
	)
}

export default Home