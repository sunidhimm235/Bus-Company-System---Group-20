const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },

  destination: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  returnDate: Date,

  price: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ['new', 'active', 'completed', 'cancelled'],
    default: 'new',
  },

  seatNumber: { 
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  completedAt: Date,
});

module.exports = mongoose.model('Reservation', reservationSchema);