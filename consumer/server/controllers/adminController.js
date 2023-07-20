import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';
import amqp from 'amqplib/callback_api.js';
import env from 'dotenv';

env.config();

var credential = {
  user: process.env.USER,
  password: process.env.PASSWORD
}

const checkCustomerLoginStatus = async (token) => {
  console.log(token)
  if (!token) {
    // If token is not provided, customer is not logged in
    return false;
  }

  try {
    // Verify the token and extract the customer's email
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // Check if the customer exists in the database based on the email
    const customer = await Customer.findOne({ email });

    if (!customer) {
      // Customer does not exist, hence not logged in
      return false;
    }

    // Customer is logged in
    return true;
  } catch (error) {
    // Error occurred during token verification, customer is not logged in
    return false;
  }
};

const consumeProductMessages = async (email, token) => {
  // Check if the customer is logged in
  const isLoggedIn = await checkCustomerLoginStatus(token);

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
          console.log('Received new product message:', { email, productId, productName ,token});

          // Acknowledge the message to remove it from the queue
          channel.ack(message);

          // res.clearCookie('token');
        }
      });
    });
  });
};

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

// Customer login
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
    consumeProductMessages(customer.email, token);

    // Successful login
    return res.status(200).json({ message: 'Login successful', token});
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


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
//           console.log('Received new product message:', {email, productId, productName  });

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
