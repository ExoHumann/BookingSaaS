const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number, // Duration in minutes
        required: true,
    },
    // Add other fields as necessary, such as category, if you want to group services
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
