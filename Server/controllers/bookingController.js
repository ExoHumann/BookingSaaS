const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
    try {
        const newBooking = await Booking.create({
            user: req.user._id, // Assuming req.user is populated by your auth middleware
            service: req.body.service,
            date: req.body.date,
            time: req.body.time,
            // Add other fields from the request
        });
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create booking', error: error.message });
    }
};

exports.createGuestBooking = async (req, res) => {
    try {
        const newBooking = await Booking.create({
            service: req.body.service,
            date: req.body.date,
            time: req.body.time,
            // Add other fields from the request
        });
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create booking', error: error.message });
    }
};


// Implement other controller functions like updateBooking, getBookings, deleteBooking as needed
