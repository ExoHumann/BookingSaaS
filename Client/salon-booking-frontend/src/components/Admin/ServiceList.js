import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceList = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const response = await axios.get('/api/services');
            setServices(response.data);
        };

        fetchServices();
    }, []);

    return (
        <div>
            <h2>Services</h2>
            <ul>
                {services.map(service => (
                    <li key={service._id}>{service.name} - {service.price} kr</li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceList;
