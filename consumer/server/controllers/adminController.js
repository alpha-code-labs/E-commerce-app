import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';

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
    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token as an HTTP-only cookie
    res.cookie('token', token, { httpOnly: true });

    // Successful login
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
