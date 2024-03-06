import React from 'react'
import { useLocation } from 'react-router-dom';
import './BusSchedule.css'

// This page should be completed by Sunidhi & Lucas

// This page should have the following:
// - Should be able to generate the bus schedule based on the user's input
// - Should be able to see the bus schedule (time, from place, to place, price) for the next 7 days
// - Should be able to filter the bus schedule by destination, time, seat available and price
// - Upon clicking on one of the bus schedule, it should pop up with more details such as:
//     1. how many seats are available
//     2. the price of the ticket depending on the class
//     3. the time of departure and arrival
//     4. the duration of the trip
//     5. the bus name, number, and driver
//     6. the features of the bus and the amenities depending on the class

const BusSchedule = () =>
{
	const location = useLocation();

	// Access the passed state from the search component
    const { from, to, date } = location.state || {};

	return (
		<div className='bus-schedule'>
			<div className='bus-schedule-header'>
				<h1>Bus Schedule</h1>
				<p>Showing bus schedule from {from} to {to} on {date ? date.toLocaleDateString() : ''}</p>
			</div>
			<div className='bus-schedule-content'>
				{/* Add your bus schedule content here */}
			</div>
		</div>
	)
}

export default BusSchedule