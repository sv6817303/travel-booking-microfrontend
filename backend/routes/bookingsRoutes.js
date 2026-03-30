const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

router.post('/', bookingsController.createBooking);
router.get('/', bookingsController.listBookings);
router.get('/:id', bookingsController.getBookingById);

module.exports = router;

