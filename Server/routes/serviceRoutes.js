const express = require('express');
const router = express.Router();
const { createService, getServices } = require('../controllers/serviceController');
const { authenticateJWT, checkRole } = require('../middlewares/authMiddleware');

// Allow only admins to add or modify services
router.post('/', authenticateJWT, checkRole(['admin']), createService);
router.get('/', getServices); // Everyone can view the services

// Define other routes for updating and deleting services

module.exports = router;
