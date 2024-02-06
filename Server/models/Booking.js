const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'private',
    },
 
    // Add additional booking fields as necessary
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
