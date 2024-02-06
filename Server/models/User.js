const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                // You can add custom email validation logic here if needed
                // This is a basic example to ensure it contains an @ symbol
                return /\S+@\S+\.\S+/.test(v);
            },
            message: 'Invalid email address',
        },
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'superuser', 'user'],
        default: 'user',
    },
    // Add other fields as needed, for example:
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    phone: {
        type: Number,
        
    },
    
        // Additional fields can be added as necessary for user data
});

// Index the email field for faster lookups
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
