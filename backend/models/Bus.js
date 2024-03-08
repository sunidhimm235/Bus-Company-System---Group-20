const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatsNumber = function(num) {
    return num.length === 40;
}

const busSchema = new Schema({
    busNumber: {type: Number,
        required: true,
        unique: true
    },
    availability: {type: Boolean,
        required: true,
        default: true
    },
    seats: {type: [[Boolean]] ,
        required: true,
        default:  false,
        validate: [seatsNumber, 'Number of seats must be 40']
    },
    routes: [{startPoint: {type: String,
            required: true},
        startTime: {type: Date,
            required: true},
        endPoint: {type: String,
            required: true},
        endTime: {type: Date,
            required: true}
    }]
})

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
