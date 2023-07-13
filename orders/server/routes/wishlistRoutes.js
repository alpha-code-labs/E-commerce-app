import express from 'express';
import {
  createWishlist,
  createWishlistItem,
  getWishlistItems,
  getWishlistsByUserId,
  updateWishlistwithnewproducts,
  deleteProductFromWishlist,
  deleteWishlist
} from '../controllers/wishlistControllers.js';

const router = express.Router();

// Create a completely new wishlist
router.post('/:userId', createWishlist);

// Create a new wishlist item within an existing wishlist
router.post('/:userId/items', createWishlistItem);

// Get the wishlist items for a user
router.get('/getall/:userId', getWishlistItems);

// Get all wishlists linked to a user
router.get('/getwishlists/:userId', getWishlistsByUserId);

// Update wishlist with new products
router.put('/:userId', updateWishlistwithnewproducts);

// Delete product from wishlist
router.delete('/:wishlistId/items/:productId', deleteProductFromWishlist);

// Delete a wishlist
router.delete('/:wishlistId', deleteWishlist);

export default router;