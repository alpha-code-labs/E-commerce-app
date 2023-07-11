import express from 'express';
import {
  createCart,
  createCartItem,
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
} from '../controllers/cartControllers.js';

const router = express.Router();

// Create a new cart
router.post('/create', createCart);

// Create a new cart item
router.post('/createcartitem', createCartItem);

// Get cart items for a user
router.get('/getcartitems/:userId', getCartItems);

// Update the quantity of a cart item
router.put('/updatequantity/:userId/:cartItemId', updateCartItemQuantity);

// Remove a cart item
router.delete('/removecartitem/:userId/:cartItemId', removeCartItem);

export default router;