const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
  const { destination, date, returnDate, price, seatNumber } = req.body;
  const userId = req.user._id; 
  
  try {
    const reservation = new Reservation({
      userId, destination, date, returnDate, price, seatNumber, status: 'new'
    });

    await reservation.save();
    res.status(201).json(reservation);
  } 
  
  catch (error) {
    res.status(400).json({ message: 'Failed to create reservation', error: error.message });
  }
};

exports.getReservations = async (req, res) => {
  const userId = req.user._id; 
  const { status } = req.query;

  try {
    const query = { userId };
    if (status) {
      query.status = status;
    }

    const reservations = await Reservation.find(query);
    res.status(200).json(reservations);
  } 
  
  catch (error) {
    res.status(400).json({ message: 'Failed to fetch reservations', error: error.message });
  }
};