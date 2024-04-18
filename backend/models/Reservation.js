const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },

  bookingId: {
    type: Number,
    required: true,
  },

  busId: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  seatNumber: { 
    type: String,
    required: true,
  },

  from: {
    type: String,
    required: true,
  },

  to: {
    type: String,
    required: true,
  },

  DepartureTime: {
    type: String,
    required: true,
  },

  ArrivalTime: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Reservation', reservationSchema);