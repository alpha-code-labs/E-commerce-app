import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';
<<<<<<< HEAD
import amqplib from 'amqplib'
=======
>>>>>>> 07106be0b76c74be140434bfb8ab9ad52101d204

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

<<<<<<< HEAD
const exchangeName = 'ex.products'

const sendMsg = async () =>{
  const connection = await amqplib.connect('amqp://guest:Anandhu@1996@localhost')
  const channel = await connection.createChannel()  
  await channel.assertExchange(exchangeName,'fanout',{durable:true})  
  const q = await channel.assertQueue('',{exclusive:true})//quename empty
  console.log(`Waiting for messages in queue : ${q.queue}`)
  channel.bindQueue(q.queue,exchangeName,'')//routing key empty
  channel.consume(q.queue,message =>{
      
      if(message.content) {
        // const {  productName,
        // description,
        // quantity,
        // price,
        // category,
        // image,
        // supplier,
        // available,
        // suppliers,
        // _id} = JSON.parse(message.content)
        console.log("New product arrival notification:",JSON.parse(message.content))
      }
  },{noAck:true})
}

=======
>>>>>>> 07106be0b76c74be140434bfb8ab9ad52101d204
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
<<<<<<< HEAD
    sendMsg()
    return res.status(200).json({ message: 'Login successful', token });

=======
    return res.status(200).json({ message: 'Login successful', token });
>>>>>>> 07106be0b76c74be140434bfb8ab9ad52101d204
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
