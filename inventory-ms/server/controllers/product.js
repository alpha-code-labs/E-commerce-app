import Product from '../model/productSchema.js';




// Create a new product
const createProduct = async (req, res) => {
    try {
      const {
        name,
        description,
        quantity,
        price,
        category,
        image,
        available,
        supplier
      } = req.body;
  
      const product = new Product({
        name,
        description,
        quantity,
        price,
        category,
        image,
        available,
        supplier
      });
  
      const createdProduct = await product.save();
  
      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(500).json({ error: "Failed to create product" });
    }
  };
  
// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
       name,
        description,
        quantity,
        price,
        category,
        image,
        available,
        supplier
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
         name,
        description,
        quantity,
        price,
        category,
        image,
        available,
        supplier
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndRemove(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
