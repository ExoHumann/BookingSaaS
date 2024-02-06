import { create, find, findByIdAndUpdate, findByIdAndRemove } from '../models/Service';

// Create a new service
export async function createService(req, res) {
  try {
    const newService = await create(req.body);
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create service', message: error.message });
  }
}

// Get a list of all services
export async function getServices(req, res) {
  try {
    const services = await find();
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get services', message: error.message });
  }
}

// Update an existing service by ID
export async function updateService(req, res) {
  try {
    const serviceId = req.params.id;

    const updatedService = await findByIdAndUpdate(serviceId, req.body, { new: true });

    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found', message: 'Service with the given ID does not exist.' });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update service', message: error.message });
  }
}

// Delete a service by ID
export async function deleteService(req, res) {
  try {
    const serviceId = req.params.id;

    const deletedService = await findByIdAndRemove(serviceId);

    if (!deletedService) {
      return res.status(404).json({ error: 'Service not found', message: 'Service with the given ID does not exist.' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete service', message: error.message });
  }
}
