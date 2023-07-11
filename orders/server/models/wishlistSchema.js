import mongoose from 'mongoose';

const wishlistItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const wishlistSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [wishlistItemSchema],
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;


