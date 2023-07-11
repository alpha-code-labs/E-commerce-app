import Order from '../models/orderSchema.js';
import Cart from '../models/cartSchema.js';
import axios from 'axios';

// Create a new order
export const createOrder = async (req, res, next) => {
  try {
    const { userId, cartId, shippingAddress, contactNumber, email, additionalNotes } = req.body;

    // Validate input
    if (!userId || !cartId || !shippingAddress || !contactNumber || !email) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Fetch the cart by cartId from the database
    const cart = await Cart.findOne({ _id: cartId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Create the order items from the cart items
    const orderItems = cart.items.map(item => ({
      product: item.product,
      quantity: item.quantity,
      price: item.price,
    }));

    // Create the order
    const orderData = {
      userId,
      orderItems,
      shippingAddress,
      contactNumber,
      email,
      additionalNotes,
    };

    // Save the order to the database using the Order model
    const order = new Order(orderData);
    const createdOrder = await order.save();

    res.status(201).json({ message: 'Order created', order: createdOrder });
  } catch (error) {
    next(error);
  }
};

// Get order details
export const getOrderDetails = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    // Validate input
    if (!orderId) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Find the order by orderId using the Order schema
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      orderId: order._id,
      orderStatus: order.orderStatus,
      orderItems: order.orderItems,
      totalAmount: order.totalAmount,
      paymentStatus: order.paymentStatus,
      shippingAddress: order.shippingAddress,
      contactNumber: order.contactNumber,
      email: order.email,
      additionalNotes: order.additionalNotes,
    });
  } catch (error) {
    next(error);
  }
};

// Cancel an order
export const cancelOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    // Find the order by orderId using the Order schema and update the orderStatus
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: 'Cancelled' },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order cancelled', order: updatedOrder });
  } catch (error) {
    next(error);
  }
};

