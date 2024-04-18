const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController'); 
const { isAuthenticated } = require('../middleware/authMiddleware');

router.post('/', busController.createBus); 
router.get('/', busController.getAllBuses);
router.get('/:from/:to', busController.getRoute);
router.patch('/:id/book-seat', isAuthenticated, busController.bookSeat);
router.patch('/:id/cancel-seat', isAuthenticated, busController.cancelSeat);
router.patch('/:busNumber/cancel-seat-wo-security', busController.cancelSeat);
router.get('/:id', busController.getBusById);
router.put('/:id', busController.updateBus);
router.delete('/', busController.deleteAllBuses);
router.delete('/delete-booked-seats-buses', busController.deleteAllBookedSeats);
router.delete('/:id', busController.deleteBus);

module.exports = router