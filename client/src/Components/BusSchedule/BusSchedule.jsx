import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './BusSchedule.css';
import BusDetailsModal from './BusScheduleModal.jsx';
import axios from 'axios'
import { FaSadTear } from 'react-icons/fa';

// This page should be completed by Sunidhi & Lucas

// This page should have the following:
// - Should be able to generate the bus schedule based on the user's input (done)
// - Should be able to see the bus schedule (time, from place, to place, price) for the next 7 days (done)
// - Should be able to filter the bus schedule by destination, time, seat available and price (done)
// - Upon clicking on one of the bus schedule, it should pop up with more details such as: (done)
//     1. how many seats are available
//     2. the price of the ticket depending on the class
//     3. the time of departure and arrival
//     4. the duration of the trip
//     5. the bus name and number
//     6. the features of the bus and the amenities depending on the class

const BusSchedule = () =>
{
	const location = useLocation();

	// Access the passed state from the search component
    const { from, to, date } = location.state || {};

	// State variables
	const [selectedBusNames, setSelectedBusNames] = useState(new Set());
	const [selectedDay, setSelectedDay] = useState(new Date(date));
	const [selectedBusForDetails, setSelectedBusForDetails] = useState(null);
	const [busRoutes, setBusRoutes] = useState([])

	// Sets the selected day
	const setDay = (day) => {
		setSelectedDay(day);
	};

	// Fetches bus routes data
	const fetchData = async (from, to) => {
		try {
			const response = await axios.get(`http://localhost:4000/buses/${from}/${to}`);
			setBusRoutes(response.data);
		} catch (error) {
			console.error('Error fetching bus routes:', error);
		}
	}

	// Fetch bus routes data when the component mounts
	useEffect(() => {
		fetchData(from, to);
	}, [from, to]);

	// Prints the busRoutes data for debugging
	console.log(busRoutes);

	// Bus schedule data
	const busSchedule = busRoutes;

	// Filters all the bus names from the bus schedule data and remove duplicates
	const busNames = busSchedule.map(bus => bus.busName);
	const uniqueBusNames = [...new Set(busNames)];

	// Toggles the bus name filter
	const toggleBusNameFilter = (busName) =>
	{
		const newSelectedBusNames = new Set(selectedBusNames);
		if (newSelectedBusNames.has(busName)) {
			newSelectedBusNames.delete(busName);
		} else {
			newSelectedBusNames.add(busName);
		}
		setSelectedBusNames(newSelectedBusNames);
	}

	// Filters the bus schedule based on the selected bus names and day
	let displayedBuses = busSchedule.filter(bus =>
        (selectedBusNames.size === 0 || selectedBusNames.has(bus.busName)) && bus.day === selectedDay.toLocaleDateString('en-US', { weekday: 'long' })
    );

	// Finds the next 7 days from the date inputted
	const next7Days = Array.from({ length: 7 }, (_, i) => {
		const nextDay = new Date(date);
		nextDay.setDate(date.getDate() + i);
		return nextDay;
	});

	// Calls this function when the "See Details" button is clicked
	const showBusDetails = (bus) => {
		setSelectedBusForDetails(bus);
	};

	// Calls this function to close the modal
	const hideBusDetails = () => {
		setSelectedBusForDetails(null);
	};

	return (
		<div className='bus-schedule'>
			<div className='bus-schedule-content'>
				<div className='bus-schedule-header'>
					<h1>Bus Schedule</h1>
					<p>Showing bus schedule from {from} to {to} on {date ? date.toLocaleDateString() : ''}</p>
				</div>

				<div className='bus-schedule-list'>
					
					<div className='bus-schedule-filter'>
						<h1>Filter by bus:</h1>
						<div className='bus-schedule-filter-list'>
							{uniqueBusNames.map((busName, index) => (
								<div key={index} className='bus-schedule-filter-item'>
									<input 
										type='checkbox' 
										id={busName} 
										checked={selectedBusNames.has(busName)}
										onChange={() => toggleBusNameFilter(busName)}
									/>
									<label htmlFor={busName}>{busName}</label>
								</div>
							))}
						</div>
					</div>

					<div className='bus-schedule-table'>
						<div className='bus-schedule-days'>
							{/* Displays the next 7 days */}
							{next7Days.map((day, index) => (
								<button 
									key={index}
									onClick={() => {
										setDay(day);
									}}

									className={day.toLocaleDateString() === selectedDay.toLocaleDateString() ? 'active' : ''}
								>{day.toLocaleDateString('en-US', { weekday: 'long' })}</button>
							))}
						</div>

						<div className='bus-schedule-table-ticket'>
							{displayedBuses.length === 0 ? <h2 className='no-buses'>Sorry <FaSadTear />, No buses available on this day</h2> :
								displayedBuses.map((bus, index) => (
									<div key={index} className='bus-schedule-ticket'>
										<div className='bus-schedule-ticket-header'>
											<h2>{bus.busName}</h2>
											<h4>({bus.from} to {bus.to})</h4>
										</div>
										<div className='bus-schedule-ticket-info'>
											<p>Bus Number: {bus.busNumber}</p>
											<p>Duration: {bus.duration}</p>
											<p>Departure Time: {bus.departureTime}</p>
											<p>Arrival Time: {bus.arrivalTime}</p>
											<p>Seats Available: {bus.economySeats.filter(seat => seat.isAvailable).length + bus.premiumSeats.filter(seat => seat.isAvailable).length + bus.businessSeats.filter(seat => seat.isAvailable).length}</p>
											<p>Starting Price: <strong style={{color:'var(--HoverColor)'}}>${bus.economyPrice}</strong></p>
										</div>
										<div className='bus-schedule-ticket-details'>
											<button onClick={() => showBusDetails(bus)}>See Details</button>
										</div>
									</div>
								))
							}
						</div>
					</div>

				</div>
			</div>

			<BusDetailsModal bus={selectedBusForDetails} onClose={hideBusDetails} />
		</div>
	)
}

export default BusSchedule