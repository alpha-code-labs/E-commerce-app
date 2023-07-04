import express from 'express';
import { login, signup } from '../controllers/adminController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/protected', verifyToken, (req, res) => {
    res.redirect('/profile');
  });
  

export default router;
