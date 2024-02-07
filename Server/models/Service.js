import { Schema, model } from 'mongoose';

const serviceSchema = new Schema({
    category: {
        typeof: 'string',
        required: true,
    },
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

const Service = model('Service', serviceSchema);

export default Service;
