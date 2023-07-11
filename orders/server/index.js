import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js';
import WishlistRoutes from './routes/wishlistRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9002;
const MONGO_URI = process.env.MONGO_URI;

app.use('/cart', cartRoutes);
app.use('/order', orderRoutes );
app.use('/wishlist',WishlistRoutes)
app.use(errorHandler);

// app.use('/',(req,res,next)=>{
//   return res.status(200).json({'msg': 'Hello from orders'})
// })


mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
