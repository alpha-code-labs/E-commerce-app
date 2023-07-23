import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';
import amqp from 'amqplib/callback_api.js';
import amqplib from 'amqplib'
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

// const exchangeName = 'ex.notifications'

//  const sendMsg = async () =>{
//     const connection = await amqplib.connect(`amqp://${process.env.RMQ_USERNAME}:${process.env.RMQ_PASSWORD}@localhost`)
//     const channel = await connection.createChannel()  
//     await channel.assertExchange(exchangeName,'fanout',{durable:true})  
//     const q = await channel.assertQueue('',{exclusive:true})//quename empty
//     console.log(`Waiting for messages in queue : ${q.queue}`)
//     channel.bindQueue(q.queue,exchangeName,'')//routing key empty
//     channel.consume(q.queue,msg =>{
//         if(msg.content) console.log("The message is :",msg.content.toString())
//     },{noAck:true})
// }

const consumeProductMessages = async (email, token,queueName, routingKey) => {
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

      const exchange = 'ex.notifications';
      // const queue = `customer_updates_queue_${email}`;
      // const routingKey = 'new_product.arrived';

      // Declare a durable queue
      channel.assertQueue(queueName, { durable: true });

      // Bind the queue to the exchange with the routing key
      channel.bindQueue(queueName, exchange, routingKey);

      // Consume messages from the queueName
      channel.consume(queueName, function (message) {
        if (message) {
         try {
      const contentString = message.content.toString();

      // Check if the content string is empty or null
      if (!contentString || contentString.trim() === '') {
        throw new Error('Message content is empty or invalid');
      }

      const msg = JSON.parse(contentString);

      // Handle the message - update customer's product list or display notification
      console.log('Received a new notification', msg);

      // Acknowledge the message to remove it from the queue
      channel.ack(message);
    } catch (error) {
      console.error('Error parsing message content:', error);
    }
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
}



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

    // Consume product messages for the logged-in customer with different queue names and routing keys
    const notificationQueue2 = `customer_updates_queue_${email}_type2`;
    const routingKey2 = 'excelupload';
    consumeProductMessages(customer.email, token, notificationQueue2, routingKey2);

    const notificationQueue1 = `customer_updates_queue_${email}_type1`;
    const routingKey1 = 'product.arrived';
    consumeProductMessages(customer.email, token, notificationQueue1, routingKey1);

    const notificationQueue3 = `customer_updates_queue_${email}_type3`;
    const routingKey3 = 'currency.converted';
    consumeProductMessages(customer.email, token, notificationQueue3, routingKey3);



    // consumeProductMessages(customer.email, token);
    // sendMsg()

    // Successful login
    return res.status(200).json({ message: 'Login successful', token});
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


