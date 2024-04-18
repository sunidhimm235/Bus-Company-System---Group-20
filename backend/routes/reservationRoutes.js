const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const reservationController = require('../controllers/reservationController');

router.post('/', isAuthenticated, reservationController.createReservation);
router.get('/', isAuthenticated, reservationController.getReservations); // add isauth
router.delete('/:id', isAuthenticated, reservationController.deleteReservation);
router.delete('/:id/delete-wo-security', reservationController.deleteReservation);

// New route to get all reservations without authentication
router.get('/all', reservationController.getAllReservations);
router.delete('/all', reservationController.deleteAllReservations);

module.exports = router;