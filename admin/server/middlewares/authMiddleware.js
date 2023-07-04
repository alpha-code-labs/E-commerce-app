import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'JWT secret is missing or not set correctly' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      } else {
        return res.status(401).json({ error: 'Invalid token' });
      }
    }

    req.user = decodedToken;
    next();
  });
};
