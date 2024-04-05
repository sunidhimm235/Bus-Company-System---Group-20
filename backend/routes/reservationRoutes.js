const express = require('express');
const router = express.Router();
const { createReservation, getReservations } = require('../controllers/reservationController');
const { isAuthenticated } = require('../middleware/authMiddleWare'); // Ensure the file name matches exactly, including case.

router.post('/', isAuthenticated, createReservation);
router.get('/', isAuthenticated, getReservations);

module.exports = router;