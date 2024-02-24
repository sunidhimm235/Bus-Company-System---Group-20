const express = require('express');
const router = express.Router();
const routeController = require('../controllers/busController');

router.post('/', routeController.createRoute);
router.get('/', routeController.getAllRoutes);
router.get('/:id', routeController.getRouteById);
router.put('/:id', routeController.updateRoute);
router.delete('/:id', routeController.deleteRoute);
router.post('/reserve-seat', routeController.reserveSeat);

module.exports = router;
