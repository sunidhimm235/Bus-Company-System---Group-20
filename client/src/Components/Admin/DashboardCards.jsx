import React from 'react';
import './DashboardCards.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaUserPlus,
  FaChartLine,
  FaBus, 
  FaTicketAlt,
  FaCommentDots } from 'react-icons/fa';

const Card = ({ number, title, Icon, bgColor, borderColor }) => {
  const cardStyle = {
    backgroundColor: bgColor || '#F0F0F0',
    borderColor: borderColor || 'transparent',
    borderWidth: borderColor ? '1px' : '0',
    borderStyle: 'solid',
    padding: '30px',
    borderRadius: '10px',
    color: 'black',
    marginBottom: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <div style={cardStyle}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{number}</h2>
        <p>{title}</p>
      </div>
      <div>
      <Icon style={{ width: '50px', height: '50px' }} />
      </div>
    </div>
  );
};


const DashboardCards = () => {

  // Get all users
  const [users, setUsers] = useState([])
  const [busRoutes, setBusRoutes] = useState([])
  const [feedback, setFeedback] = useState([])

  const fetchData = async () => {
      try {
          const responseUser = await axios.get('http://localhost:4000/users/');
          setUsers(responseUser.data);
          console.log(responseUser.data);

          const responseBus = await axios.get('http://localhost:4000/buses/');
          setBusRoutes(responseBus.data);
          console.log(responseBus.data);

          const responseFeedback = await axios.get('http://localhost:4000/contact/');
          setFeedback(responseFeedback.data);
          console.log(responseFeedback.data);
      }
      catch (error) {
          console.error('Error fetching data:', error);
      }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log('Users:', users);
  console.log('Buses:', busRoutes);

  //Calculate Total Buses
  const totalBuses = busRoutes.length;
  // const totalAdmins = users.filter(user => user.role === 'admin').length;
  const totalUsers = users.filter(user => user.role === 'user').length;
  // const totalEmployees = users.filter(user => user.role === 'employee').length;
  const totalFeedback = feedback.length;

  const [reservations, setReservations] = useState(0);
  const [economyTickets, setEconomyTickets] = useState(0);
  const [premiumTickets, setPremiumTickets] = useState(0);
  const [businessTickets, setBusinessTickets] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    fetch('http://localhost:4000/api/reservations/all')
      .then(response => response.json())
      .then(data => {
        setReservations(data.length);
        const economyReservations = data.filter(reservation => reservation.seatNumber.startsWith('E'));
        const premiumReservations = data.filter(reservation => reservation.seatNumber.startsWith('P'));
        const businessReservations = data.filter(reservation => reservation.seatNumber.startsWith('B'));
        setEconomyTickets(economyReservations.length);
        setPremiumTickets(premiumReservations.length);
        setBusinessTickets(businessReservations.length);
        const totalProfit = data.reduce((total, reservation) => total + reservation.price, 0);
        setTotalProfit(Number(totalProfit.toFixed(2)));
      });
  }, []);

  return (
    <div className="cardContainer">
      <Card number={totalBuses} title="Total Buses Operational" Icon={FaBus} bgColor="#E3F2FD" borderColor="#000000" />
      <Card number={totalFeedback} title="Total Feedback Received" Icon={FaCommentDots} bgColor="#E3F2FD" borderColor="#000000" />
      <Card number={totalUsers} title="Total Users" Icon={FaUserPlus} bgColor="#E3F2FD" borderColor="#000000" />
      {/* <Card number={totalAdmins} title="Total Admins" Icon={FaTools} bgColor="#E3F2FD" borderColor="#000000" /> */}
      {/* <Card number={totalEmployees} title="Total Employees" Icon={FaTools} bgColor="#E3F2FD" borderColor="#000000" /> */}
      <Card number={reservations} title="Total Tickets Sold" Icon={FaTicketAlt} bgColor="#E3F2FD" borderColor="#000000" />
      <Card number={totalProfit} title="Total Profit Overall" Icon={FaChartLine} bgColor="#E3F2FD" borderColor="#000000" />
      <Card number={economyTickets} title="Total Economy Tickets Sold" Icon={FaTicketAlt} bgColor="#E3F2FD" borderColor="#000000" />
      <Card number={premiumTickets} title="Total Premium Tickets Sold" Icon={FaTicketAlt} bgColor="#E3F2FD" borderColor="#000000" />
      <Card number={businessTickets} title="Total Business Tickets Sold" Icon={FaTicketAlt} bgColor="#E3F2FD" borderColor="#000000" />
    </div>
  );
};

export default DashboardCards;
