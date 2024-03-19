const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateTotalSeats = function (seats) {
    const totalSeats = seats.economy.length + seats.premium.length + seats.business.length;
    return totalSeats === 40;
}

const busSchema = new Schema({
    busNumber: {type: Number,
        required: true,
        unique: true
    },
    busName: {type: String,
        required: true
    },
    busDay: {type: String,
        required: true
    },
    activeStatus: {type: Boolean,
        required: true,
        default: true
    },
    seats: [{
        economy: {type: [[Boolean]] ,
            required: true,
            default:  false,
        },
        premium: {type: [[Boolean]] ,
            required: true,
            default:  false,
        },
        business: {type: [[Boolean]] ,
            required: true,
            default:  false,
        },
        validate: [validateTotalSeats, 'Total seats should be 40']
    }],
    duration: {type: String,
        required: true
    },
    routes: [{startPoint: {type: String,
            required: true},
        startTime: {type: String,
            required: true},
        endPoint: {type: String,
            required: true},
        endTime: {type: String,
            required: true}
    }],
    price: [{
        economy: {type: Number,
            required: true},
        premium: {type: Number,
            required: true},
        business: {type: Number,
            required: true}
    }]
})

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
