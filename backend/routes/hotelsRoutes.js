const express = require('express');
const router = express.Router();
const hotelsController = require('../controllers/hotelsController');

router.get('/', hotelsController.listHotels);
router.get('/:id', hotelsController.getHotelById);

module.exports = router;

