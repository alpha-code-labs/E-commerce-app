import express from 'express';
import { signup, login } from '../controllers/customerControllers.js';
import { authenticateToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// Customer signup
router.post('/signup', signup);

// Customer login
router.post('/login', login);

// Protected route 
router.get('/profile', authenticateToken, (req, res) => {
  // This route is only accessible with a valid JWT token
  // Access the authenticated customer's ID using req.customerId
  res.json({ message: 'This is a protected route', customerId: req.customerId });
});

export default router;
