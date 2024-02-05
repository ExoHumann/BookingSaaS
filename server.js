const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
// Add more routes as needed

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
// Add more route uses as needed

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
