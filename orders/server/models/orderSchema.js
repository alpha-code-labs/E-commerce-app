import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  orderStatus: {
    type: String,
    enum: ['Placed', 'In Transit', 'Failed', 'Delivered'],
    default: 'Placed',
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  additionalNotes: {
    type: String,
  },
});

orderSchema.pre('save', async function (next) {
  try {
    const Cart = mongoose.model('Cart');
    const cart = await Cart.findById(this.cart);

    if (cart) {
      // Calculate totalAmount based on cart items
      const cartItems = cart.items;
      let totalAmount = 0;

      for (const item of cartItems) {
        totalAmount += item.quantity * item.product.price;
      }

      this.totalAmount = totalAmount;
      this.paymentStatus = 'Pending'; // initial status
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
