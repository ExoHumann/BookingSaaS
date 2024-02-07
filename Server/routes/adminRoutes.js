const router = require('express').Router();
import { checkRole } from '../middlewares/authMiddleware';
import { updateRole } from '../controllers/adminController';

// Middleware to check if the user is an admin
router.use(checkRole(['admin']));

router.post('/users/:id/role', updateRole);
