const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateTotalSeats = function (seats) {
    const totalSeats = seats.economy.length + seats.premium.length + seats.business.length;
    return totalSeats === 40;
}

const seatSchema = new Schema({
    type: { 
        type: String, 
        required: true, 
        enum: ['economy', 'premium', 'business'] 
    },
    seats: { 
        type: [[Boolean]], 
        required: true, 
        default: false 
    }
});

const routeSchema = new Schema({
    startPoint: { 
        type: String, 
        required: true 
    },
    startTime: { 
        type: String, 
        required: true 
    },
    endPoint: { 
        type: String, 
        required: true 
    },
    endTime: { 
        type: String, 
        required: true 
    }
});

const priceSchema = new Schema({
    economy: { 
        type: Number, 
        required: true 
    },
    premium: { 
        type: Number, 
        required: true 
    },
    business: { 
        type: Number, 
        required: true 
    }
});

const busSchema = new Schema({
    busNumber: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    busName: { 
        type: String, 
        required: true 
    },
    busDay: { 
        type: String, 
        required: true 
    },
    activeStatus: { 
        type: Boolean, 
        required: true, 
        default: true 
    },
    seats: [seatSchema],
    duration: { 
        type: String, 
        required: true 
    },
    routes: [routeSchema],
    price: [priceSchema]
});

busSchema.path('seats').validate(validateTotalSeats, 'Total seats should be 40');

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
