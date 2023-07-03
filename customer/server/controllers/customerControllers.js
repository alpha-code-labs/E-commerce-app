import bcrypt from 'bcrypt';
import Joi from 'joi';
import Customer from '../models/customerSchema.js';
import jwt from 'jsonwebtoken';
import { setTokenCookie } from '../middlewares/verifyToken.js';
import dotenv from 'dotenv';

dotenv.config();

// Signup controller
export const signup = async (req, res, next) => {
  try {
    const { fullName, email, password, phone } = req.body;

    // Validate the request body
    const schema = Joi.object({
      fullName: Joi.string().required().error(new Error('Full name is required')),
      email: Joi.string().email().required().error(new Error('Invalid email')),
      password: Joi.string().required().error(new Error('Password is required')),
      phone: Joi.string().pattern(/^\d{10}$/).required().error(new Error('Invalid phone number')),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = {};
      error.details.forEach((detail) => {
        const { key, message } = detail;
        errorMessages[key] = message;
      });
      return res.status(400).json({ error: errorMessages });
    }

    // Check if the email is already registered
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    // Hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new customer
    const newCustomer = new Customer({
      fullName,
      email,
      password: hashedPassword,
      salt,
      phone,
    });

    // Save the customer to the database
    await newCustomer.save();
    return res.json({ message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    return next(error); // Passing the error to the error handling middleware
  }
};

// Login controller
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate the request body
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        'string.email': 'Invalid email',
        'any.required': 'Email is required',
      }),
      password: Joi.string().required().messages({
        'any.required': 'Password is required',
      }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = {};
      error.details.forEach((detail) => {
        const { context, message } = detail;
        errorMessages[context.key] = message.replace(/['"]/g, '');
      });
      return res.status(400).json({ error: errorMessages });
    }

    // Check if the email exists in the database
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the stored password
    const passwordMatch = await bcrypt.compare(password, customer.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ customerId: customer._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Set the JWT token as an HTTP-only cookie
    setTokenCookie(res, token);

    return res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return next(error); // Pass the error to the error handling middleware
  }
};
