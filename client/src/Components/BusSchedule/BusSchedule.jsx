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
// - Should be able to filter the bus schedule by destination, time, seat available and price (remaining)
// - Upon clicking on one of the bus schedule, it should pop up with more details such as: (working on it)
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

	const [selectedBusNames, setSelectedBusNames] = useState(new Set());
	const [selectedDay, setSelectedDay] = useState(new Date(date));
	const [selectedBusForDetails, setSelectedBusForDetails] = useState(null);

	const [busRoutes, setBusRoutes] = useState([])
	const encodedDate = encodeURIComponent(date.toISOString().split('T')[0]);

	const fetchData = async (from, to, date) => {
		try {
			const response = await axios.get(`http://localhost:4000/buses/${from}/${to}/${date}`);
			setBusRoutes(response.data);
		}
		catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		if (from && to && encodedDate) {
			fetchData(from, to, encodedDate);
		}
	}, [from, to, encodedDate]);

	// print the busRoutes data
	console.log(busRoutes);

	// Bus schedule data
	const busSchedule = busRoutes;

	// const busSchedule = [
	// 	{
	// 		busName: 'Gorgi Bus',
	// 		busNumber: 'G123',
	// 		from: 'New York',
	// 		to: 'Los Angeles',
	// 		day: 'Monday',
	// 		departureTime: '8:00 AM',
	// 		arrivalTime: '12:00 PM',
	// 		duration: '4 hours',
	// 		seatAvailable: 32,
	// 		economyPrice: 100,
	// 		premiumPrice: 150,
	// 		businessPrice: 200,
	// 	},
	// 	{
	// 		busName: 'Gorgi Bus',
	// 		busNumber: 'G555',
	// 		from: 'New York',
	// 		to: 'Los Angeles',
	// 		day: 'Monday',
	// 		departureTime: '12:00 PM',
	// 		arrivalTime: '4:00 PM',
	// 		duration: '4 hours',
	// 		seatAvailable: 22,
	// 		economyPrice: 100,
	// 		premiumPrice: 150,
	// 		businessPrice: 200,
	// 	},
	// 	{
	// 		busName: 'Gorgi Bus',
	// 		busNumber: 'G266',
	// 		from: 'New York',
	// 		to: 'Los Angeles',
	// 		day: 'Monday',
	// 		departureTime: '4:00 PM',
	// 		arrivalTime: '7:00 PM',
	// 		duration: '3 hours',
	// 		seatAvailable: 40,
	// 		economyPrice: 100,
	// 		premiumPrice: 150,
	// 		businessPrice: 200,
	// 	},
	// 	{
	// 		busName: 'Micki Bus',
	// 		busNumber: 'M456',
	// 		from: 'New York',
	// 		to: 'Los Angeles',
	// 		day: 'Tuesday',
	// 		departureTime: '9:00 AM',
	// 		arrivalTime: '9:00 PM',
	// 		duration: '12 hours',
	// 		seatAvailable: 40,
	// 		economyPrice: 90,
	// 		premiumPrice: 140,
	// 		businessPrice: 190,
	// 	},
	// 	{
	// 		busName: 'Bolt bus',
	// 		busNumber: 'B789',
	// 		from: 'New York',
	// 		to: 'Los Angeles',
	// 		day: 'Wednesday',
	// 		departureTime: '10:00 AM',
	// 		arrivalTime: '10:00 PM',
	// 		duration: '12 hours',
	// 		seatAvailable: 40,
	// 		economyPrice: 110,
	// 		premiumPrice: 160,
	// 		businessPrice: 210,
	// 	}
	// ]

	// Set the selected day
	const setDay = (day) => {
		setSelectedDay(day);
	}

	// Filter all the bus names from the bus schedule data and remove duplicates
	const busNames = busSchedule.map(bus => bus.busName);
	const uniqueBusNames = [...new Set(busNames)];

	// Toggle the bus name filter
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

	let displayedBuses = busSchedule.filter(bus =>
        (selectedBusNames.size === 0 || selectedBusNames.has(bus.busName)) && bus.day === selectedDay.toLocaleDateString('en-US', { weekday: 'long' })
    );

	// Finds the next 7 days from the date inputted
	const next7Days = Array.from({ length: 7 }, (_, i) => {
		const nextDay = new Date(date);
		nextDay.setDate(date.getDate() + i);
		return nextDay;
	});

	// Call this function when the "See Details" button is clicked
	const showBusDetails = (bus) => {
		setSelectedBusForDetails(bus);
	};

	// Call this function to close the modal
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
											<p>Seats Available: {bus.seatAvailable}</p>
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