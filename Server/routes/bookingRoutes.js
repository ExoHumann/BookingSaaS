const express = require('express');
const router = express.Router();
const { createBooking } = require('../controllers/bookingController');
const { authenticateJWT } = require('../middlewares/authMiddleware');

router.post('/', authenticateJWT, createBooking); // Create a new booking
// Add other booking routes (GET, PUT, DELETE) as needed

module.exports = router;
