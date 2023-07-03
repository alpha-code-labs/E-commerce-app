import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (customerId) => {
  const token = jwt.sign({ customerId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  return token;
};

export const setTokenCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next({ statusCode: 401, message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return next({ statusCode: 401, message: 'Unauthorized' });
    }

    req.customerId = decoded.customerId;
    next();
  });
};

export const handleAuthenticationError = (err, req, res, next) => {
  const { statusCode = 500, message = 'Internal server error' } = err;

  res.status(statusCode).json({ error: message });
};
