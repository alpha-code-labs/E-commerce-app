// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import Customer from '../models/Customer.js';
// import amqp from 'amqplib/callback_api.js';

// var credential ={
//   user:'guest',
//   password:'RabbitMQ@3318'
// }

// const consumeProductMessages = async (email, handleMessage) => {
//   // RabbitMQ connection URL
//   const connectionURL = `amqp://${credential.user}:${credential.password}@localhost`;

//   // Create a consumer
//   amqp.connect(connectionURL, function (error, connection) {
//     if (error) {
//       throw error;
//     }

//     connection.createChannel(function (error, channel) {
//       if (error) {
//         throw error;
//       }

//       const exchange = 'product_updates_exchange';
//       const queue = `customer_updates_queue_${email}`;
//       const routingKey = 'new_product.arrived';

//       // Declare a durable queue
//       channel.assertQueue(queue, { durable: true });

//       // Bind the queue to the exchange with the routing key
//       channel.bindQueue(queue, exchange, routingKey);

//       // Consume messages from the queue
//       channel.consume(queue, function (message) {
//         if (message) {
//           const { productId, productName } = JSON.parse(message.content.toString());

//           // Call the provided handleMessage function with the productId and productName
//           handleMessage(productId, productName);

//           // Acknowledge the message to remove it from the queue
//           channel.ack(message);
//         }
//       });
//     });
//   });
// };

// // Customer signup
// export const signup = async (req, res) => {
//   // Your existing signup code
// };

// // Customer login
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if customer with the provided email exists
//     const customer = await Customer.findOne({ email });

//     if (!customer) {
//       return res.status(404).json({ error: 'Customer not found' });
//     }

//     // Validate password
//     const passwordMatch = await bcrypt.compare(password, customer.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ email: customer.email }, process.env.JWT_SECRET, { expiresIn: '2d' });

//     // Set the token as an HTTP-only cookie
//     res.cookie('token', token, { httpOnly: true });

//     // Consume product messages for the logged-in customer
//     const handleMessage = (productId, productName) => {
//       // Send productId and productName in the response
//       const response = { message: 'Login successful', token, productId, productName };
//       res.status(200).json(response);
//     };
//     consumeProductMessages(customer.email, handleMessage);

//     // Successful login
//     return;
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };



// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import Customer from '../models/Customer.js';
// import amqp from 'amqplib/callback_api.js';

// var credential ={
//   user:'guest',
//   password:'RabbitMQ@3318'
// }

// const consumeProductMessages = async (email, handleMessage) => {
//   // RabbitMQ connection URL
//   const connectionURL = `amqp://${credential.user}:${credential.password}@localhost`;

//   // Create a consumer
//   amqp.connect(connectionURL, function (error, connection) {
//     if (error) {
//       throw error;
//     }

//     connection.createChannel(function (error, channel) {
//       if (error) {
//         throw error;
//       }

//       const exchange = 'product_updates_exchange';
//       const queue = `customer_updates_queue_${email}`;
//       const routingKey = 'new_product.arrived';

//       // Declare a durable queue
//       channel.assertQueue(queue, { durable: true });

//       // Bind the queue to the exchange with the routing key
//       channel.bindQueue(queue, exchange, routingKey);

//       // Consume messages from the queue
//       channel.consume(queue, function (message) {
//         if (message) {
//           const { productId, productName } = JSON.parse(message.content.toString());

//           // Call the provided handleMessage function with the productId and productName
//           handleMessage(productId, productName);

//           // Acknowledge the message to remove it from the queue
//           channel.ack(message);
//         }
//       });
//     });
//   });
// };

// // Customer signup
// export const signup = async (req, res) => {
//   // Your existing signup code
// };

// // Customer login
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if customer with the provided email exists
//     const customer = await Customer.findOne({ email });

//     if (!customer) {
//       return res.status(404).json({ error: 'Customer not found' });
//     }

//     // Validate password
//     const passwordMatch = await bcrypt.compare(password, customer.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ email: customer.email }, process.env.JWT_SECRET, { expiresIn: '2d' });

//     // Set the token as an HTTP-only cookie
//     res.cookie('token', token, { httpOnly: true });

//     // Consume product messages for the logged-in customer
//     const handleMessage = (productId, productName) => {
//       // Send productId and productName in the response if available, otherwise send null
//       const response = { message: 'Login successful', token, productId: productId || null, productName: productName || null };
//       res.status(200).json(response);
//     };
//     consumeProductMessages(customer.email, handleMessage);

//     // Successful login
//     return;
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };



// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import Customer from '../models/Customer.js';
// import amqp from 'amqplib/callback_api.js';

// var credential ={
//   user:'guest',
//   password:'RabbitMQ@3318'
// }

// const consumeProductMessages = async (email, handleMessage) => {
//   // RabbitMQ connection URL
//   const connectionURL = `amqp://${credential.user}:${credential.password}@localhost`;

//   // Create a consumer
//   amqp.connect(connectionURL, function (error, connection) {
//     if (error) {
//       throw error;
//     }

//     connection.createChannel(function (error, channel) {
//       if (error) {
//         throw error;
//       }

//       const exchange = 'product_updates_exchange';
//       const queue = `customer_updates_queue_${email}`;
//       const routingKey = 'new_product.arrived';

//       // Declare a durable queue
//       channel.assertQueue(queue, { durable: true });

//       // Bind the queue to the exchange with the routing key
//       channel.bindQueue(queue, exchange, routingKey);

//       // Consume messages from the queue
//       channel.consume(queue, function (message) {
//         if (message) {
//           const { productId, productName } = JSON.parse(message.content.toString());

//           // Call the provided handleMessage function with the productId and productName
//           handleMessage(productId, productName);

//           // Acknowledge the message to remove it from the queue
//           channel.ack(message);
//         }
//       });
//     });
//   });
// };

// // Customer signup
// export const signup = async (req, res) => {
//   // Your existing signup code
// };

// // Customer login
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if customer with the provided email exists
//     const customer = await Customer.findOne({ email });

//     if (!customer) {
//       return res.status(404).json({ error: 'Customer not found' });
//     }

//     // Validate password
//     const passwordMatch = await bcrypt.compare(password, customer.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ email: customer.email }, process.env.JWT_SECRET, { expiresIn: '2d' });

//     // Set the token as an HTTP-only cookie
//     res.cookie('token', token, { httpOnly: true });

//     // Consume product messages for the logged-in customer
//     const handleMessage = (productId, productName) => {
//       // Send productId and productName in the response
//       const response = { message: 'Login successful', token, productId, productName };
//       res.status(200).json(response);
//     };
//     consumeProductMessages(customer.email, handleMessage);

//     // Successful login
//     return;
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };




// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import Customer from '../models/Customer.js';
// import amqp from 'amqplib/callback_api.js';

// var credential ={
//   user:'guest',
//   password:'RabbitMQ@3318'
// }

// const consumeProductMessages = async (email) => {
//   // RabbitMQ connection URL
//   const connectionURL = `amqp://${credential.user}:${credential.password}@localhost`;

//   // Create a consumer
//   amqp.connect(connectionURL, function (error, connection) {
//     if (error) {
//       throw error;
//     }

//     connection.createChannel(function (error, channel) {
//       if (error) {
//         throw error;
//       }

//       const exchange = 'product_updates_exchange';
//       const queue = `customer_updates_queue_${email}`;
//       const routingKey = 'new_product.arrived';

//       // Declare a durable queue
//       channel.assertQueue(queue, { durable: true });

//       // Bind the queue to the exchange with the routing key
//       channel.bindQueue(queue, exchange, routingKey);

//       // Consume messages from the queue
//       channel.consume(queue, function (message) {
//         if (message) {
//           const { productId, productName } = JSON.parse(message.content.toString());

//           // Handle the message - update customer's product list or display notification
//           console.log('Received new product message:', { productId, productName,email });

//           // Acknowledge the message to remove it from the queue
//           channel.ack(message);
//         }
//       });
//     });
//   });
// };

// // Customer signup
// export const signup = async (req, res) => {
//   const { username, password, email } = req.body;

//   try {
//     // Check if customer with the provided email already exists
//     const existingCustomer = await Customer.findOne({ email });

//     if (existingCustomer) {
//       return res.status(409).json({ error: 'Customer already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new customer
//     const newCustomer = new Customer({
//       username,
//       password: hashedPassword,
//       email,
//     });

//     // Save the new customer to the database
//     await newCustomer.save();

//     return res.status(201).json({ message: 'Customer created successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if customer with the provided email exists
//     const customer = await Customer.findOne({ email });

//     if (!customer) {
//       return res.status(404).json({ error: 'Customer not found' });
//     }

//     // Validate password
//     const passwordMatch = await bcrypt.compare(password, customer.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ email: customer.email }, process.env.JWT_SECRET, { expiresIn: '2d' });

//     // Set the token as an HTTP-only cookie
//     res.cookie('token', token, { httpOnly: true });

//     // Consume product messages for the logged-in customer
//     consumeProductMessages(customer.email);

//     // Successful login
//     return res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };


// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import Customer from '../models/Customer.js';
// import amqp from 'amqplib/callback_api.js';

// var credential ={
//   user:'guest',
//   password:'RabbitMQ@3318'
// }

// const consumeProductMessages = async (email) => {
//   // RabbitMQ connection URL
//   const connectionURL = `amqp://${credential.user}:${credential.password}@localhost`;

//   // Create a consumer
//   amqp.connect(connectionURL, function (error, connection) {
//     if (error) {
//       throw error;
//     }

//     connection.createChannel(function (error, channel) {
//       if (error) {
//         throw error;
//       }

//       const exchange = 'product_updates_exchange';
//       const queue = `customer_updates_queue_${email}`;
//       const routingKey = 'new_product.arrived';

//       // Declare a durable queue
//       channel.assertQueue(queue, { durable: true });

//       // Bind the queue to the exchange with the routing key
//       channel.bindQueue(queue, exchange, routingKey);

//       // Consume messages from the queue
//       channel.consume(queue, function (message) {
//         if (message) {
//           const { productId, productName } = JSON.parse(message.content.toString());

//           // Handle the message - update customer's product list or display notification

//           // Acknowledge the message to remove it from the queue
//           channel.ack(message);
//         }
//       });
//     });
//   });
// };


// // Customer signup
// export const signup = async (req, res) => {
//   const { username, password, email } = req.body;

//   try {
//     // Check if admin with the provided email already exists
//     const existingCustomer = await Customer.findOne({ email });

//     if (existingCustomer) {
//       return res.status(409).json({ error: 'Customer already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new admin
//     const newCustomer = new Customer({
//       username,
//       password: hashedPassword,
//       email,
//     });

//     // Save the new admin to the database
//     await newCustomer.save();

//     return res.status(201).json({ message: 'Customer created successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if customer with the provided email exists
//     const customer = await Customer.findOne({ email });

//     if (!customer) {
//       return res.status(404).json({ error: 'Customer not found' });
//     }

//     // Validate password
//     const passwordMatch = await bcrypt.compare(password, customer.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ email: customer.email }, process.env.JWT_SECRET, { expiresIn: '2d' });

//     // Set the token as an HTTP-only cookie
//     res.cookie('token', token, { httpOnly: true });

//     // Consume product messages for the logged-in customer
//     consumeProductMessages(customer.email());

//     // Successful login
//     return res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };


































// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import Customer from '../models/Customer.js';
// import amqp from 'amqplib/callback_api.js';

// const credential={
//   user:'guest',
//   password:'RabbitMQ@3318'
// }

// const rabbitMQConfig = {
//   connectionURL: `amqp://${credential.user}:${credential.password}@localhost`,
//   exchange: 'product_updates_exchange',
//   routingKey: 'new_product.arrived',
// };

// const consumeProductMessages = async (email, messageHandler) => {
//   try {
//     // Create a connection to RabbitMQ
//     amqp.connect(rabbitMQConfig.connectionURL, function (error, connection) {
//       if (error) {
//         throw error;
//       }

//       // Create a channel
//       connection.createChannel(function (error, channel) {
//         if (error) {
//           throw error;
//         }

//         const queue = `customer_updates_queue_${email}`;

//         // Declare a durable queue
//         channel.assertQueue(queue, { durable: true });

//         // Bind the queue to the exchange with the routing key
//         channel.bindQueue(queue, rabbitMQConfig.exchange, rabbitMQConfig.routingKey);

//         // Consume messages from the queue
//         channel.consume(queue, function (message) {
//           if (message) {
//             const { productId, productName } = JSON.parse(message.content.toString());

//             // Call the provided messageHandler callback function
//             messageHandler({ productId, productName });

//             // Acknowledge the message to remove it from the queue
//             channel.ack(message);
//           }
//         });
//       });
//     });
//   } catch (error) {
//     console.error('RabbitMQ connection or consumption error:', error);
//   }
// };

// // Customer signup
// export const signup = async (req, res) => {
//   // Your existing signup code
// };

// // Customer login
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
// //     // Your existing login code

// //     // Consume product messages for the logged-in customer
// //     consumeProductMessages(Customer.email, ({ productId, productName }) => {
// //       // Handle the message - update customer's product list or display notification
// //     });

// //     // Successful login
// //     return res.status(200).json({ message: 'Login successful', token });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ error: 'Internal server error' });
// //   }
// // };












// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import Customer from '../models/Customer.js';
// import amqp from 'amqplib/callback_api.js';

// const consumeProductMessages = async (email) => {
//   // RabbitMQ connection URL
//   const connectionURL = `amqp://${credential.user}:${credential.password}@localhost`;

//   // Create a consumer
//   amqp.connect(connectionURL, function (error, connection) {
//     if (error) {
//       throw error;
//     }

//     connection.createChannel(function (error, channel) {
//       if (error) {
//         throw error;
//       }

//       const exchange = 'product_updates_exchange';
//       const queue = `customer_updates_queue_${email}`;
//       const routingKey = 'new_product.arrived';

//       // Declare a durable queue
//       channel.assertQueue(queue, { durable: true });

//       // Bind the queue to the exchange with the routing key
//       channel.bindQueue(queue, exchange, routingKey);

//       // Consume messages from the queue
//       channel.consume(queue, function (message) {
//         if (message) {
//           const { productId, productName } = JSON.parse(message.content.toString());

//           // Handle the message - update customer's product list or display notification

//           // Acknowledge the message to remove it from the queue
//           channel.ack(message);
//         }
//       });
//     });
//   });
// };

/ const consumeProductMessages = async (email, handleMessage) => {
    //   // RabbitMQ connection URL
    //   const connectionURL = `amqp://${credential.user}:${credential.password}@localhost`;
    
    //   // Create a consumer
    //   amqp.connect(connectionURL, function (error, connection) {
    //     if (error) {
    //       throw error;
    //     }
    
    //     connection.createChannel(function (error, channel) {
    //       if (error) {
    //         throw error;
    //       }
    
    //       const exchange = 'product_updates_exchange';
    //       const queue = `customer_updates_queue_${email}`;
    //       const routingKey = 'new_product.arrived';
    
    //       // Declare a durable queue
    //       channel.assertQueue(queue, { durable: true });
    
    //       // Bind the queue to the exchange with the routing key
    //       channel.bindQueue(queue, exchange, routingKey);
    
    //       // Consume messages from the queue
    //       channel.consume(queue, function (message) {
    //         if (message) {
    //           const { productId, productName } = JSON.parse(message.content.toString());
    
    //           // Call the provided handleMessage function with the productId and productName
    //           handleMessage(productId, productName);
    
    //           // Acknowledge the message to remove it from the queue
    //           channel.ack(message);
    //         }
    //       });
    //     });
    //   });
    // };
    
    
    // Customer signup
    export const signup = async (req, res) => {
      const { username, password, email } = req.body;
    
      try {
        // Check if admin with the provided email already exists
        const existingCustomer = await Customer.findOne({ email });
    
        if (existingCustomer) {
          return res.status(409).json({ error: 'Customer already exists' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new admin
        const newCustomer = new Customer({
          username,
          password: hashedPassword,
          email,
        });
    
        // Save the new admin to the database
        await newCustomer.save();
    
        return res.status(201).json({ message: 'Customer created successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    };
    
    // Customer login
    export const login = async (req, res) => {
      const { email, password } = req.body;
    
      try {
        // Check if admin with the provided email exists
        const admin = await Customer.findOne({ email });
    
        if (!admin) {
          return res.status(404).json({ error: 'Customer not found' });
        }
    
        // Validate password
        const passwordMatch = await bcrypt.compare(password, admin.password);
    
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid password' });
        }
    
        // Generate JWT token
        const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: '2d' });
    
        // Set the token as an HTTP-only cookie
        res.cookie('token', token, { httpOnly: true });
    
        // Successful login
        return res.status(200).json({ message: 'Login successful', token });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // import bcrypt from 'bcrypt';
    // import jwt from 'jsonwebtoken';
    // import Customer from '../models/Customer.js';
    // import amqp from 'amqplib/callback_api.js';
    
    
    // // Customer signup
    // export const signup = async (req, res) => {
    //   const { username, password, email } = req.body;
    
    //   try {
    //     // Check if admin with the provided email already exists
    //     const existingCustomer = await Customer.findOne({ email });
    
    //     if (existingCustomer) {
    //       return res.status(409).json({ error: 'Customer already exists' });
    //     }
    
    //     // Hash the password
    //     const hashedPassword = await bcrypt.hash(password, 10);
    
    //     // Create a new admin
    //     const newCustomer = new Customer({
    //       username,
    //       password: hashedPassword,
    //       email,
    //     });
    
    //     // Save the new admin to the database
    //     await newCustomer.save();
    
    //     return res.status(201).json({ message: 'Customer created successfully' });
    //   } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ error: 'Internal server error' });
    //   }
    // };
    
    // // Customer login
    // export const login = async (req, res) => {
    //   const { email, password } = req.body;
    
    //   try {
    //     // Check if admin with the provided email exists
    //     const admin = await Customer.findOne({ email });
    
    //     if (!admin) {
    //       return res.status(404).json({ error: 'Admin not found' });
    //     }
    
    //     // Validate password
    //     const passwordMatch = await bcrypt.compare(password, admin.password);
    
    //     if (!passwordMatch) {
    //       return res.status(401).json({ error: 'Invalid password' });
    //     }
    
    //     // Generate JWT token
    //     const tokenPayload = {
    //       email: admin.email,
    //       username: admin.username,
    //       _id: admin._id,
    //     };
    
    //     const token = jwt.sign(tokenPayload, '1234', { expiresIn: '1h' });
    
    //     // Set the token as an HTTP-only cookie
    //     res.cookie('token', token, { httpOnly: true });
    
    
    //     // Publish message to RabbitMQ
    //     const cradentials ={
    //       user:'guest',
    //       pass:"RabbitMQ@3318"
    //     }
    
    
    //     const connectionURL = `amqp://${cradentials.user}:${cradentials.pass}@localhost`; // Replace with your RabbitMQ connection URL
    //     const exchange = 'consumer_updates_exchange';
    //     const routingKey = 'consumer.logged_in';
    //     const message = {
    //       email: admin.email,
    //       username: admin.username,
    //       _id: admin._id,
    //     };
    
    //     amqp.connect(connectionURL, function (error, connection) {
    //       if (error) {
    //         throw error;
    //       }
    
    //       connection.createChannel(function (error, channel) {
    //         if (error) {
    //           throw error;
    //         }
    
    //         channel.assertExchange(exchange, 'topic', { durable: false });
    //         channel.publish(
    //           exchange,
    //           routingKey,
    //           Buffer.from(JSON.stringify(message))
    //         );
    
    //         console.log('Consumer login message published to RabbitMQ',message.email);
    //       });
    
    //       setTimeout(function () {
    //         connection.close();
    //       }, 500);
    //     });
    
    //     // Successful login
    //     return res.status(200).json({ message: 'Login successful', token });
    //   } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ error: 'Internal server error' });
    //   }
    // };
    
    
    
    
    
    // export const login = async (req, res) => {
    //   const { email, password } = req.body;
    
    //   try {
    //     // Check if admin with the provided email exists
    //     const admin = await Admin.findOne({ email });
    
    //     if (!admin) {
    //       return res.status(404).json({ error: 'Admin not found' });
    //     }
    
    //     // Validate password
    //     const passwordMatch = await bcrypt.compare(password, admin.password);
    
    //     if (!passwordMatch) {
    //       return res.status(401).json({ error: 'Invalid password' });
    //     }
    
    //     // Generate JWT token
    //     const tokenPayload = {
    //       email: admin.email,
    //       username: admin.username,
    //       _id: admin._id,
    //     };
    
    //     const token = jwt.sign(tokenPayload, '1234', { expiresIn: '1h' });
    
    //     // Set the token as an HTTP-only cookie
    //     res.cookie('token', token, { httpOnly: true });
    
    //     // Publish message to RabbitMQ
    //     const connectionURL = 'amqp://localhost'; // Replace with your RabbitMQ connection URL
    //     const exchange = 'consumer_updates_exchange';
    //     const routingKey = 'consumer.logged_in';
    //     const message = {
    //       email: admin.email,
    //       username: admin.username,
    //       _id: admin._id,
    //     };
    
    //     amqp.connect(connectionURL, function (error, connection) {
    //       if (error) {
    //         throw error;
    //       }
    
    //       connection.createChannel(function (error, channel) {
    //         if (error) {
    //           throw error;
    //         }
    
    //         channel.assertExchange(exchange, 'topic', { durable: false });
    //         channel.publish(
    //           exchange,
    //           routingKey,
    //           Buffer.from(JSON.stringify(message))
    //         );
    
    //         console.log('Consumer login message published to RabbitMQ');
    //       });
    
    //       setTimeout(function () {
    //         connection.close();
    //       }, 500);
    //     });
    
    //     // Successful login
    //     return res.status(200).json({ message: 'Login successful', token });
    //   } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ error: 'Internal server error' });
    //   }
    // };
    
    
    
    
    
    
    
    
    
    
    
    import bcrypt from 'bcrypt';
    import jwt from 'jsonwebtoken';
    import Customer from '../models/Customer.js';
    import amqp from 'amqplib/callback_api.js';
    
    var credential ={
      user:'guest',
      password:'RabbitMQ@3318'
    }
    const consumeProductMessages = async (email) => {
      // Check if the customer is logged in
      // Add your logic to check the customer's login status here
      const isLoggedIn = checkCustomerLoginStatus(email);
    
      if (!isLoggedIn) {
        console.log('Customer is not logged in. Skipping message consumption.');
        return;
      }
    
      // RabbitMQ connection URL
      const connectionURL = `amqp://${credential.user}:${credential.password}@localhost`;
    
      // Create a consumer
      amqp.connect(connectionURL, function (error, connection) {
        if (error) {
          throw error;
        }
    
        connection.createChannel(function (error, channel) {
          if (error) {
            throw error;
          }
    
          const exchange = 'product_updates_exchange';
          const queue = `customer_updates_queue_${email}`;
          const routingKey = 'new_product.arrived';
    
          // Declare a durable queue
          channel.assertQueue(queue, { durable: true });
    
          // Bind the queue to the exchange with the routing key
          channel.bindQueue(queue, exchange, routingKey);
    
          // Consume messages from the queue
          channel.consume(queue, function (message) {
            if (message) {
              const { productId, productName } = JSON.parse(message.content.toString());
    
              // Handle the message - update customer's product list or display notification
              console.log('Received new product message:', { email, productId, productName });
    
              // Acknowledge the message to remove it from the queue
              channel.ack(message);
            }
          });
        });
      });
    };
    
    
    // const consumeProductMessages = async (email) => {
    //   // RabbitMQ connection URL
    //   const connectionURL = `amqp://${credential.user}:${credential.password}@localhost`;
    
    //   // Create a consumer
    //   amqp.connect(connectionURL, function (error, connection) {
    //     if (error) {
    //       throw error;
    //     }
    
    //     connection.createChannel(function (error, channel) {
    //       if (error) {
    //         throw error;
    //       }
    
    //       const exchange = 'product_updates_exchange';
    //       const queue = `customer_updates_queue_${email}`;
    //       const routingKey = 'new_product.arrived';
    
    //       // Declare a durable queue
    //       channel.assertQueue(queue, { durable: true });
    
    //       // Bind the queue to the exchange with the routing key
    //       channel.bindQueue(queue, exchange, routingKey);
    
    //       // Consume messages from the queue
    //       channel.consume(queue, function (message) {
    //         if (message) {
    //           const { productId, productName } = JSON.parse(message.content.toString());
    
    //           // Handle the message - update customer's product list or display notification
    //           console.log('Received new product message:', {email, productId, productName  });
    
    //           // Acknowledge the message to remove it from the queue
    //           channel.ack(message);
    //         }
    //       });
    //     });
    //   });
    // };
    
    // Customer signup
    export const signup = async (req, res) => {
      const { username, password, email } = req.body;
    
      try {
        // Check if customer with the provided email already exists
        const existingCustomer = await Customer.findOne({ email });
    
        if (existingCustomer) {
          return res.status(409).json({ error: 'Customer already exists' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new customer
        const newCustomer = new Customer({
          username,
          password: hashedPassword,
          email,
        });
    
        // Save the new customer to the database
        await newCustomer.save();
    
        return res.status(201).json({ message: 'Customer created successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    };
    
    export const login = async (req, res) => {
      const { email, password } = req.body;
    
      try {
        // Check if customer with the provided email exists
        const customer = await Customer.findOne({ email });
    
        if (!customer) {
          return res.status(404).json({ error: 'Customer not found' });
        }
    
        // Validate password
        const passwordMatch = await bcrypt.compare(password, customer.password);
    
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid password' });
        }
    
        // Generate JWT token
        const token = jwt.sign({ email: customer.email }, process.env.JWT_SECRET, { expiresIn: '2d' });
    
        // Set the token as an HTTP-only cookie
        res.cookie('token', token, { httpOnly: true });
    
        // Consume product messages for the logged-in customer
        consumeProductMessages(customer.email);
    
        // Successful login
        return res.status(200).json({ message: 'Login successful', token });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    };    