const express = require('express');
const router = express.Router();
const { createBooking, updateBooking, getBookings, deleteBooking } = require('../controllers/bookingController');
const { authenticateJWT } = require('../middlewares/authMiddleware');

router.post('/', authenticateJWT, createBooking); // Create a new booking
router.put('/:id', authenticateJWT, updateBooking); // Update an existing booking by ID
router.get('/', getBookings); // Get a list of all bookings
router.delete('/:id', deleteBooking); // Delete a booking by ID

module.exports = router;
