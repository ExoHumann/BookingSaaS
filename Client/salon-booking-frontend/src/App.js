import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import ServiceBooking from './components/Customer/ServiceBooking';
import ServiceList from './components/Admin/ServiceList';
import ServiceForm from './components/Admin/ServiceForm';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/book-service" component={ServiceBooking} />
                <Route path="/admin/services" component={ServiceList} />
                <Route path="/admin/service-form" component={ServiceForm} />
                /* Add more routes as needed */
            </Switch>
        </Router>
    );
};

export default App;
