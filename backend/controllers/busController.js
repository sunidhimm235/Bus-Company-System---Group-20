const Bus = require('../models/Bus'); 

exports.createBus = async (req, res) => {
    try {
        const bus = new Bus(req.body);
        await bus.save();
        res.status(201).json(bus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getBusById = async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        if (!bus) return res.status(404).json({ message: 'Bus not found' });
        res.json(bus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateBus = async (req, res) => {
    try {
        const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteBus = async (req, res) => {
    try {
        await Bus.findByIdAndDelete(req.params.id);
        res.json({ message: 'Bus deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAllBuses = async (req, res) => {
    try {
        await Bus.deleteMany();
        res.json({ message: 'All buses deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Fetches buses based on the route
exports.getRoute = async (req, res) => {
    try {
        const { from, to } = req.params;
        const buses = await Bus.find({ from, to });
        res.json(buses);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
} 

// Helps to book a seat
exports.bookSeat = async (req, res) => {
    try {
        const { busId, seatNumber } = req.body;

        console.log('Bus ID:', busId);
        console.log('Seat Number:', seatNumber);

        const bus = await Bus.findById(busId);
        if (!bus) return res.status(404).json({ message: 'Bus not found' });

        console.log('Bus:', bus);

        const seat = bus.economySeats.find(seat => seat.number === seatNumber) || 
                    bus.premiumSeats.find(seat => seat.number === seatNumber) || 
                    bus.businessSeats.find(seat => seat.number === seatNumber);

        console.log('Seat:', seat);
        
        if (!seat) return res.status(404).json({ message: 'Seat not found' });

        seat.isAvailable = false;
        await bus.save();

        res.json({ message: 'Seat booked successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Helps to cancel a seat
exports.cancelSeat = async (req, res) => {
    try {
        const { busId, seatNumber } = req.body;

        console.log('Bus ID:', busId);
        console.log('Seat Number:', seatNumber);

        // find bus by busNumber in the database
        const bus = await Bus.findOne({ busNumber: busId });

        console.log('Bus:', bus);

        if (!bus) return res.status(404).json({ message: 'Bus not found' });

        const seat = bus.economySeats.find(seat => seat.number === seatNumber) || 
                    bus.premiumSeats.find(seat => seat.number === seatNumber) || 
                    bus.businessSeats.find(seat => seat.number === seatNumber);

        console.log('Seat:', seat);

        if (!seat) return res.status(404).json({ message: 'Seat not found' });

        seat.isAvailable = true;
        await bus.save();

        res.json({ message: 'Seat canceled successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Find all bus that has a seat number available as false and delete them
exports.deleteAllBookedSeats = async (req, res) => {
    try {
        const buses = await Bus.find();
        buses.forEach(bus => {
            bus.economySeats.forEach(seat => {
                if (!seat.isAvailable) {
                    seat.isAvailable = true;
                }
            });
            bus.premiumSeats.forEach(seat => {
                if (!seat.isAvailable) {
                    seat.isAvailable = true;
                }
            });
            bus.businessSeats.forEach(seat => {
                if (!seat.isAvailable) {
                    seat.isAvailable = true;
                }
            });
            bus.save();
        });
        res.json({ message: 'All booked seats deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};