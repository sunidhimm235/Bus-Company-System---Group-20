const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
  const userId = req.userId;
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
  const userId = req.userId;
  const { status, page = 1, limit = 10 } = req.query; // default page=1, limit=10 for pagination

  try {
    let query = { userId };
    if (status) query.status = status;

    // Calculate total documents and apply pagination
    const total = await Reservation.countDocuments(query);
    const reservations = await Reservation.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // adding isPast flag to each reservation based on current date
    const enhancedReservations = reservations.map(reservation => ({
      ...reservation._doc,
      isPast: reservation.date < new Date(),
    }));

    res.status(200).json({
      reservations: enhancedReservations,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } 
  
  catch (error) {
    console.error("Failed to fetch reservations:", error);
    res.status(400).json({ message: 'Failed to fetch reservations', error: error.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('userId', 'username').exec();
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Failed to fetch all reservations:", error);
    res.status(500).json({ message: 'Failed to fetch all reservations', error: error.message });
  }
};
