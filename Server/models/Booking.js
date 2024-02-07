import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
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

const Booking = model('Booking', bookingSchema);

export default Booking;
