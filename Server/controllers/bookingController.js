import { create, findByIdAndUpdate, find, findByIdAndRemove } from '../models/Booking';

// Create a booking for an authenticated user
export async function createBooking(req, res) {
  try {
    const newBooking = await create({
      user: req.user._id, // Assuming req.user is populated by your auth middleware
      service: req.body.service,
      date: req.body.date,
      time: req.body.time,
      // Add other fields from the request
    });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create booking', message: error.message });
  }
}

// Create a booking for a guest user (without user information)
export async function createGuestBooking(req, res) {
  try {
    const newBooking = await create({
      service: req.body.service,
      date: req.body.date,
      time: req.body.time,
      // Add other fields from the request
    });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create booking', message: error.message });
  }
}

// Update an existing booking by ID
export async function updateBooking(req, res) {
  try {
    const bookingId = req.params.id;

    // Find the booking by its ID in the database and update it with the new data
    const updatedBooking = await findByIdAndUpdate(bookingId, req.body, { new: true });

    // Check if the booking exists
    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found', message: 'Booking with the given ID does not exist.' });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update booking', message: error.message });
  }
}

// Get a list of all bookings
export async function getBookings(req, res) {
  try {
    // Fetch all bookings from the database
    const bookings = await find();

    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get bookings', message: error.message });
  }
}

// Delete a booking by ID
export async function deleteBooking(req, res) {
  try {
    const bookingId = req.params.id;

    // Find and remove the booking by its ID in the database
    const deletedBooking = await findByIdAndRemove(bookingId);

    // Check if the booking exists
    if (!deletedBooking) {
      return res.status(404).json({ error: 'Booking not found', message: 'Booking with the given ID does not exist.' });
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete booking', message: error.message });
  }
}
