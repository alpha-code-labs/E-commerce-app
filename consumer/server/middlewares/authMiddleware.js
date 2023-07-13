import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization

  console.log('provided token is', token)

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const tokenValue = token.split(' ')[1]
  console.log(tokenValue)

  //verify and decode token
  const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET)

  //get username, email and id from payload
  const {email, username, _id} = decodedToken


  //find user with provided email
  const customer = await Customer.findOne({email}) 

  //check for _id
  console.log(customer,'from backend')

  if(!customer){
    return res.status(404).json({error : 'Customer not found'})
  }

  //suspicious code
  //Attach the username and _id to the customer object
  //customer.username = username;
  //customer._id = _id;

  //return the customer details
  return res.status(200).json(customer)
}
