const mongoose = require('mongoose');

const connection = mongoose.createConnection(process.env.DATABASE_URI);

const seatsNumber = function(num) {
    return num.length === 40;
}

const busSchema = new mongoose.Schema({
    busNumber: {type: Number,
        required: true,
        unique: true
    },
    availability: {type: Boolean,
        required: true,
        default: true
    }
})

module.exports = mongoose.model('Bus', busSchema);
