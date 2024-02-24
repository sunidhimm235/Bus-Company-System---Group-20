const Route = require('../models/Route');

exports.createRoute = async (req, res) => {
    try {
        const newRoute = new Route(req.body);
        await newRoute.save();
        res.status(201).json({ message: "Route created successfully", data: newRoute });
    } catch (error) {
        res.status(400).json({ message: "Error creating route", error: error.message });
    }
};

exports.getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching routes", error: error.message });
    }
};

exports.getRouteById = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }
        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ message: "Error fetching route", error: error.message });
    }
};

exports.updateRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }
        res.status(200).json({ message: "Route updated successfully", data: route });
    } catch (error) {
        res.status(400).json({ message: "Error updating route", error: error.message });
    }
};

exports.deleteRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndDelete(req.params.id);
        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }
        res.status(200).json({ message: "Route deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting route", error: error.message });
    }
};

exports.reserveSeat = async (req, res) => {
    try {
        const { routeId, seatNumber } = req.body;
        const route = await Route.findById(routeId);

        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }

        // Example logic for seat reservation
        if (route.seats.includes(seatNumber)) {
            return res.status(400).json({ message: "Seat already reserved" });
        }

        route.seats.push(seatNumber);
        await route.save();

        res.status(200).json({ message: "Seat reserved successfully", data: route });
    } catch (error) {
        res.status(500).json({ message: "Error reserving seat", error: error.message });
    }
};
