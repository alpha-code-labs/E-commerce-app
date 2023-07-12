import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Retrieve the token from the request headers
    console.log(token , 'from product routes');
  
    if (token) {
      try {
        const decodedToken = jwt.verify(token, '1234'); // Verify the token using your secret key
  
        if (decodedToken.email) {
          // Admin is verified, proceed to the next middleware or route handler
          req.email = decodedToken.email; 
          req.username =decodedToken.username
          req._id = decodedToken._id
          
          console.log(req.email)
          console.log(req.username)
          console.log(req._id)
          
          next();
        } else {
          throw new Error('Not authorized as admin');
        }
      } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      res.status(401).json({ message: 'No token found' });
    }
  };