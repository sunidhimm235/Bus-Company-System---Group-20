const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const reservationController = require('../controllers/reservationController');

router.post('/', isAuthenticated, reservationController.createReservation);
router.get('/', isAuthenticated, reservationController.getReservations); // add isauth

// New route to get all reservations without authentication
router.get('/all', reservationController.getAllReservations);

module.exports = router;