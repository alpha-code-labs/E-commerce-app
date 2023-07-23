

import express from 'express';
import mongoose from 'mongoose';
import amqplib from 'amqplib';
import dotenv from 'dotenv';
import { Notification } from './model.js'



const app = express();
dotenv.config();

const exchangeName = 'ex.notifications';

app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful MongoDB connection
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Notification microservice listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const sendMsg = async (msg, routingKey) => {
  try {
    // Connect to RabbitMQ server
    const connection = await amqplib.connect(`amqp://${process.env.RMQ_USERNAME}:${process.env.RMQ_PASSWORD}@localhost`);
    const channel = await connection.createChannel();

    // Assert a direct exchange
    await channel.assertExchange(exchangeName, 'topic', { durable: true });

    const msgString = JSON.stringify(msg);

    // Publish the message to the exchange with the specified routing key
    channel.publish(exchangeName, routingKey, Buffer.from(msgString));

    console.log('Message sent to RabbitMQ:', msg);

    // Close the channel and connection
    // await channel.close();
    // await connection.close();
  } catch (err) {
    console.error('Error sending message to RabbitMQ:', err);
  }
};

// Route for receiving messages from other microservices and publishing to RabbitMQ
app.post('/publish-to-rabbitmq/:routingKey', async (req, res) => {
  const {message,productName,productId,from,to,amount,convertedAmount}= req.body|| 'Received a notification';
  const routingKey = req.params.routingKey;

  const msg = {
    message:message,
    productName:productName,
    productId:productId,
    from:from,
    to:to,
    amount:amount,
    convertedAmount:convertedAmount

  }
  

  try {
    // Publish the message to RabbitMQ
    await sendMsg(msg, routingKey);

    // Store the received message in MongoDB using Mongoose
    await storeMessageInMongoDB(msg);

    res.status(200).json({ success: true, message: 'Message sent to RabbitMQ and stored in MongoDB' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to send message to RabbitMQ or store in MongoDB' });
  }
});

const storeMessageInMongoDB = async (msg) => {
  try {
    // Extract the "message" property from the "msg" object
   const message = JSON.stringify(msg) || 'Received a notification'

   // Extract the "productId" property from the "msg" object
   const productId = msg.productId || null;

   const notification = new Notification({
    message:msg.message,
    productId,
    productName: msg.productName || null,
    currencyConversion: {
      from: msg.from,
      to: msg.to,
      amount: msg.amount,
      convertedAmount: msg.convertedAmount,
      // Add any other relevant currency conversion fields here
    },
  });


    // Save the document to the database
    await notification.save();

    

    console.log('Message stored in MongoDB:', message);
  } catch (err) {
    console.error('Error storing message in MongoDB:', err);
  }
};
