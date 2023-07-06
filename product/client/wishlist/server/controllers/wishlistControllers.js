import Wishlist from '../models/wishlistSchema.js';

// Create a completely new wishlist
export const createWishlist = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Create a new wishlist
    const wishlist = new Wishlist({ userId });

    // Save the wishlist
    const createdWishlist = await wishlist.save();

    res.json({ message: 'Wishlist created', wishlist: createdWishlist });
  } catch (error) {
    next(error);
  }
};

// Create a new wishlist item within an existing wishlist
export const createWishlistItem = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { product } = req.body;

    // Validate input
    if (!userId || !product) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Create the wishlist item
    const wishlistItem = { product };

    // Find the wishlist by user ID
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $setOnInsert: { userId, items: [] } },
      { upsert: true, new: true }
    );

    // Add the wishlist item to the wishlist
    wishlist.items.push(wishlistItem);

    // Save the wishlist
    await wishlist.save();

    res.status(201).json({ message: 'Wishlist item created', wishlist });
  } catch (error) {
    next(error);
  }
};

// Update wishlist with new products
export const updateWishlistwithnewproducts = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { products } = req.body;
  
      // Validate input
      if (!userId || !products || !Array.isArray(products)) {
        return res.status(400).json({ error: 'Invalid input. Make sure userId is provided and products is an array.' });
      }
  
      // Find the wishlist by user ID
      const wishlist = await Wishlist.findOne({ userId });
  
      if (!wishlist) {
        return res.status(404).json({ error: 'Wishlist not found.' });
      }
  
      // Validate each product item
      const validatedProducts = products.map((product) => {
        if (!mongoose.Types.ObjectId.isValid(product)) {
          throw new Error(`Invalid product ID: ${product}`);
        }
        return {
          product: new mongoose.Types.ObjectId(product),
          quantity: 1, // Set the quantity as desired
        };
      });
  
      // Update the wishlist items
      wishlist.items = validatedProducts;
  
      // Save the wishlist
      await wishlist.save();
  
      res.json({ message: 'Wishlist updated', wishlist });
    } catch (error) {
      next(error); // Pass the error to the error handler middleware
    }
  };
  
// Delete product from wishlist
export const deleteProductFromWishlist = async (req, res, next) => {
  try {
    const { wishlistId, productId } = req.params;

    // Find the wishlist by ID
    const wishlist = await Wishlist.findById(wishlistId);

    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    // Find the index of the product in the wishlist items
    const index = wishlist.items.findIndex((item) => item.product.toString() === productId);

    if (index === -1) {
      return res.status(404).json({ error: 'Product not found in the wishlist' });
    }

    // Remove the product from the wishlist
    wishlist.items.splice(index, 1);

    // Save the wishlist
    await wishlist.save();

    res.json({ message: 'Product deleted from the wishlist', wishlist });
  } catch (error) {
    next(error);
  }
};


  // Delete a wishlist
export const deleteWishlist = async (req, res, next) => {
    try {
      const { wishlistId } = req.params;
  
      // Find the wishlist by ID
      const wishlist = await Wishlist.findById(wishlistId);
  
      if (!wishlist) {
        return res.status(404).json({ error: 'Wishlist not found' });
      }
  
      // Delete the wishlist
      await wishlist.deleteOne();
  
      res.json({ message: 'Wishlist deleted' });
    } catch (error) {
      next(error);
    }
  };
  