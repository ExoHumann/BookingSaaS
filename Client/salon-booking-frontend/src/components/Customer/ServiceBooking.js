import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceBooking = () => {
    const [services, setServices] = useState([]);
    const [bookingDetails, setBookingDetails] = useState({
        serviceId: '',
        date: '',
        time: '',
    });

    useEffect(() => {
        const fetchServices = async () => {
            const response = await axios.get('/api/services');
            setServices(response.data);
        };

        fetchServices();
    }, []);

    const handleChange = (e) => {
        setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/bookings', bookingDetails);
        // Handle post-submit logic
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Select Service:
                <select name="serviceId" value={bookingDetails.serviceId} onChange={handleChange}>
                    {services.map(service => (
                        <option key={service._id} value={service._id}>{service.name}</option>
                    ))}
                </select>
            </label>
            {/* Add fields for date, time, etc. */}
            <button type="submit">Book Service</button>
        </form>
    );
};

export default ServiceBooking;
