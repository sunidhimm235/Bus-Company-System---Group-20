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
        // Gets the seat ID from the request body
        const { seatId } = req.body;

        // Finds the bus by ID
        const bus = await Bus.findById(req.params.id);
        if (!bus) return res.status(404).json({ message: 'Bus not found' });

        // Finds the seat and update its availability
        const seat = bus.economySeats.id(seatId) || bus.premiumSeats.id(seatId) || bus.businessSeats.id(seatId);
        if (seat) {
            seat.isAvailable = false;
            await bus.save();
            res.status(200).json({ message: 'Seat booked successfully' });
        } else {
            res.status(404).json({ message: 'Seat not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
