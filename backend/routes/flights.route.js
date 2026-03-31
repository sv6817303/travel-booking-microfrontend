const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flights.controller');

// MVP: Search → Results only
router.get('/', flightsController.listFlights);

module.exports = router;

