import express from 'express';
import {
  createWishlist,
  createWishlistItem,
  updateWishlistwithnewproducts,
  deleteProductFromWishlist,
  deleteWishlist
} from '../controllers/wishlistControllers.js';

const router = express.Router();

// Create a completely new wishlist
router.post('/:userId', createWishlist);

// Create a new wishlist item within an existing wishlist
router.post('/:userId/items', createWishlistItem);

// Update wishlist with new products
router.put('/:userId', updateWishlistwithnewproducts);

// Delete product from wishlist
router.delete('/:wishlistId/items/:productId', deleteProductFromWishlist);

// Delete a wishlist
router.delete('/:wishlistId', deleteWishlist);

export default router;
