import express from 'express';
import {
  createOrder,
  getOrderDetails,
  cancelOrder,
} from '../controllers/orderController.js';

const router = express.Router();

// Create a new order
router.post('/createOrder', createOrder);

// Get order details
router.get('/:orderId', getOrderDetails);

// Cancel an order
router.patch('/:orderId/cancel', cancelOrder);

export default router;
