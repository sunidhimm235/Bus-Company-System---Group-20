const mongoose = require('mongoose');
const { Schema } = mongoose;

const seatSchema = new Schema({
    number:
    {
      type: String,
      required: true
    },
    isAvailable:
    {
      type: Boolean,
      required: true,
      default: true
    }
});

const busSchema = new Schema({
    busName:
    {
        type: String,
        required: true
    },
    busNumber:
    {
        type: String,
        required: true,
        unique: true
    },
    from:
    {
        type: String,
        required: true
    },
    to:
    {
        type: String,
        required: true
    },
    day:
    {
        type: String,
        required: true
    },
    departureTime:
    {
        type: String,
        required: true
    },
    arrivalTime:
    {
        type: String,
        required: true
    },
    duration:
    {
        type: String,
        required: true
    },
    economyPrice:
    {
        type: Number,
        required: true
    },
    premiumPrice:
    {
        type: Number,
        required: true
    },
    businessPrice:
    {
        type: Number,
        required: true
    },
    economySeats: [seatSchema],
    premiumSeats: [seatSchema],
    businessSeats: [seatSchema],
    activeStatus:
    {
        type: Boolean,
        default: true
    }
});

// Validation for seats count
busSchema.path('economySeats').validate(function (value) {
    return value.length === 20;
}, '20 seats required in Economy Class');

busSchema.path('premiumSeats').validate(function (value) {
    return value.length === 12;
}, '12 seats required in Premium Class');

busSchema.path('businessSeats').validate(function (value) {
    return value.length === 8;
}, '8 seats required in Business Class');

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;