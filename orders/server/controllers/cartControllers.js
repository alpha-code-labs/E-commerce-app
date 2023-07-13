import Cart from "../models/cartSchema.js";

// Create a new cart
export const createCart = async (req, res, next) => {
  try {
    const { userId } = req.body;

    // Validate input
    if (!userId) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Create the cart
    const cart = new Cart({ user: userId });

    // Save the cart
    const createdCart = await cart.save();

    res.status(201).json({ message: "Cart created", cart: createdCart });
  } catch (error) {
    next(error);
  }
};

// Create a new cart item
export const createCartItem = async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate input
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Create the cart item
    const cartItem = {
      product: productId,
      quantity,
    };

    // Find the cart by user ID
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Add the cart item to the cart
    cart.items.push(cartItem);

    // Save the cart
    await cart.save();

    res.status(201).json({ message: "Cart item created", cart });
  } catch (error) {
    next(error);
  }
};

// Get cart items for a user
export const getCartItems = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Validate input
    if (!userId) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Find the cart by user ID
    const cart = await Cart.find({ user: userId });

    if (cart.length === 0) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// Update the quantity of a cart item
export const updateCartItemQuantity = async (req, res, next) => {
  try {
    const { userId, cartItemId, quantity } = req.body;

    // Validate input
    if (!userId || !cartItemId || !quantity) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Find the cart by user ID
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the index of the cart item in the cart items array
    const index = cart.items.findIndex(
      (item) => item._id.toString() === cartItemId
    );

    if (index === -1) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Update the quantity of the cart item
    cart.items[index].quantity = quantity;

    // Save the cart
    await cart.save();

    res.json({ message: "Cart item quantity updated", cart });
  } catch (error) {
    next(error);
  }
};

// Remove a cart item
export const removeCartItem = async (req, res, next) => {
  try {
    const { userId, cartItemId } = req.params;

    // Find the cart by user ID
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the index of the cart item in the cart items array
    const index = cart.items.findIndex(
      (item) => item._id.toString() === cartItemId
    );

    if (index === -1) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Remove the cart item from the cart
    cart.items.splice(index, 1);

    // Save the cart
    await cart.save();

    res.json({ message: "Cart item removed", cart });
  } catch (error) {
    next(error);
  }
};