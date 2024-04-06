const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
  console.log(req.userId.id)
  const userId = req.userId.id;
  const { destination, date, returnDate, price, seatNumber } = req.body;

  console.log("Creating reservation for user:", userId); 
  console.log("Reservation details:", req.body); 
  
  try {
    const reservation = new Reservation({
      userId, destination, date, returnDate, price, seatNumber, status: 'new'
    });

    await reservation.save();
    console.log("Reservation created successfully:", reservation); 
    res.status(201).json(reservation);
  } 
  
  catch (error) {
    console.error("Failed to create reservation:", error); 
    res.status(400).json({ message: 'Failed to create reservation', error: error.message });
  }
};

exports.getReservations = async (req, res) => {
  const userId = req.user._id; 
  const { status } = req.query;

  console.log("Fetching reservations for user:", userId); 
  console.log("Query parameters:", req.query); 

  try {
    const query = { userId };
    if (status) {
      query.status = status;
      console.log("Filtering by status:", status); 
    }

    const reservations = await Reservation.find(query);
    console.log("Found reservations:", reservations); 
    res.status(200).json(reservations);
  } 
  
  catch (error) {
    console.error("Failed to fetch reservations:", error); // Log any errors
    res.status(400).json({ message: 'Failed to fetch reservations', error: error.message });
  }
};