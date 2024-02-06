const router = require('express').Router();
const { checkRole } = require('../middlewares/authMiddleware');
const { updateRole } = require('../controllers/adminController');

// Middleware to check if the user is an admin
router.use(checkRole(['admin']));

router.post('/users/:id/role', updateRole);
