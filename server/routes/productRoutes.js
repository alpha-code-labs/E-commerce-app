import express from 'express';
import jwt from 'jsonwebtoken';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProductsforConsumers
  
} from '../controllers/product.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.js';


const router = express.Router();

router.post('/create', verifyAdmin, createProduct);
router.get('/products',verifyAdmin, getAllProducts);
router.get('/consproduct', getAllProductsforConsumers);
router.get('/product/:id', getProductById);
router.put('/products/:id',verifyAdmin,  updateProduct);
router.delete('/products/:id',verifyAdmin,  deleteProduct);

export default router;


