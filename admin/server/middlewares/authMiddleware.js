import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const getToken = async (req, res) => {
  try {
    // Check if req.headers.authorization is defined
    const token = req.headers.authorization;
    console.log(token, 'token ');

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Extract the token value without the "Bearer " prefix
    const tokenValue = token.split(' ')[1];

    // Verify and decode the token
    const decodedToken = jwt.verify(tokenValue, '1234');

    // Get the email, username, and _id from the token payload
    const { email, username, _id } = decodedToken;

    // Find the admin with the provided email
    const admin = await Admin.findOne({ email });
    

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Attach the username and _id to the admin object
    admin.username = username;
    admin._id = _id;
     
    // Return the admin details
    return res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error admin' });
  }
};
