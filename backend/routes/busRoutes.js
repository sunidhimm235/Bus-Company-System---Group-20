const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController'); 
const { isAuthenticated } = require('../middleware/authMiddleware');

router.post('/', busController.createBus); 
router.get('/', busController.getAllBuses);
router.get('/:from/:to', busController.getRoute);
router.patch('/:id/book-seat', isAuthenticated, busController.bookSeat);
router.get('/:id', busController.getBusById);
router.put('/:id', busController.updateBus);
router.delete('/', busController.deleteAllBuses);
router.delete('/:id', busController.deleteBus);

module.exports = router