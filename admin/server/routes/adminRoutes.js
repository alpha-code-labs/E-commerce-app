import express from 'express';
import { login, signup} from '../controllers/adminController.js';
import  {getToken}  from '../middlewares/authMiddleware.js';



const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/admin',getToken)
  

export default router;
