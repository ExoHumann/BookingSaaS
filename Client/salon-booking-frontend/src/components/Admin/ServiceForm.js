import React, { useState } from 'react';
import axios from 'axios';

const ServiceForm = ({ existingService }) => {
    const [service, setService] = useState(existingService || {});

    const handleChange = (e) => {
        setService({ ...service, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (service._id) {
            await axios.put(`/api/services/${service._id}`, service);
        } else {
            await axios.post('/api/services', service);
        }
        // Handle post-submit logic, like redirecting or refreshing the list
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Service Name:
                <input type="text" name="name" value={service.name} onChange={handleChange} />
            </label>
            {/* Add other fields like price, duration, etc. */}
            <button type="submit">Save</button>
        </form>
    );
};

export default ServiceForm;
