const Service = require('../models/Service');

exports.createService = async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create service', error: error.message });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get services', error: error.message });
  }
};

// Implement other operations like updateService, deleteService as needed
