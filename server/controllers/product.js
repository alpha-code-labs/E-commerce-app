import Product from '../model/productSchema.js';
import amqp from 'amqplib/callback_api.js';

var credential = {
  user:'guest',
  password:'password'
}

const connectionURL = `amqp://${credential.user}:${credential.password}@localhost`;


const createProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      quantity,
      price,
      category,
      image,
      available, 
      supplier
    } = req.body;

    // Get the admin username from the request object (assuming it is set in the verifyAdmin middleware)
    const { username ,email} = req;

    const product = new Product({
      productName,
      description,
      quantity,
      price,
      category,
      image,
      available,
      supplier,
      suppliers: {
        adminUsername: username,
        adminEmail: email,
      },
    });

    const createdProduct = await product.save();

    //publish msg to rabbitMQ----------------
    amqp.connect(connectionURL, function (error, connection) {
      if (error) {
        throw error;
      }

      connection.createChannel(function (error, channel) {
        if (error) {
          throw error;
        }

        const exchange = 'product_updates_exchange';
        const routingKey = 'new_product.arrived';

        const message = {
          productId: createdProduct._id,
          productName: createdProduct.productName,
          // Include any other relevant information about the new product
        };

        channel.assertExchange(exchange, 'topic', { durable: false });
        channel.publish(
          exchange,
          routingKey,
          Buffer.from(JSON.stringify(message))
        );

        console.log('Message published to RabbitMQ','prouductId :>>',message.productId, 'product name : >>',message.productName);
      });

      setTimeout(function () {
        
        connection.close();
      }, 5000);
    });



 

 


  ////////////////////////////
    

    res.status(201).json(createdProduct);
   
    console.log('posted')
    
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};



const getAllProducts = async (req, res) => {
  try {
    const email = req.email; // Get the admin email from the request object
    console.log(email ,'from get product')

    // Find the products where the supplier's adminEmail matches the admin's email
    const products = await Product.find({ 'suppliers.adminEmail': email });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
const getAllProductsforConsumers = async (req, res) => {
  try {
    const email = req.email; // Get the admin email from the request object
    console.log(email ,'from get product')

    // Find the products where the supplier's adminEmail matches the admin's email
    const products = await Product.find({});

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
       productName,
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
         productName,
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

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct ,getAllProductsforConsumers};



// import Product from '../model/productSchema.js';



// const createProduct = async (req, res) => {
//   try {
//     const {
//       productName,
//       description,
//       quantity,
//       price,
//       category,
//       image,
//       available, 
//       supplier
//     } = req.body;

//     // Get the admin username from the request object (assuming it is set in the verifyAdmin middleware)
//     const { username ,email} = req;

//     const product = new Product({
//       productName,
//       description,
//       quantity,
//       price,
//       category,
//       image,
//       available,
//       supplier,
//       suppliers: {
//         adminUsername: username,
//         adminEmail: email,
//       },
//     });

//     const createdProduct = await product.save();

//     res.status(201).json(createdProduct);
   
//     console.log('posted')
    
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create product" });
//   }
// };



// const getAllProducts = async (req, res) => {
//   try {
//     const email = req.email; // Get the admin email from the request object
//     console.log(email ,'from get product')

//     // Find the products where the supplier's adminEmail matches the admin's email
//     const products = await Product.find({ 'suppliers.adminEmail': email });

//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// };
// const getAllProductsforConsumers = async (req, res) => {
//   try {
//     const email = req.email; // Get the admin email from the request object
//     console.log(email ,'from get product')

//     // Find the products where the supplier's adminEmail matches the admin's email
//     const products = await Product.find({});

//     res.status(200).json(products);
//     res.send('<script>window.location.reload()</script>')
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// };

// // Get a single product by ID
// const getProductById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await Product.findById(id);

//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch product" });
//   }
// };

// // Update a product
// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//        productName,
//         description,
//         quantity,
//         price,
//         category,
//         image,
//         available,
//         supplier
//     } = req.body;

//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       {
//          productName,
//         description,
//         quantity,
//         price,
//         category,
//         image,
//         available,
//         supplier
//       },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update product" });
//   }
// };

// // Delete a product
// const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedProduct = await Product.findByIdAndRemove(id);

//     if (!deletedProduct) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete product" });
//   }
// };

// export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct ,getAllProductsforConsumers};