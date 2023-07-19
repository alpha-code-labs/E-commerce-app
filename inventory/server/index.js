im:port express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Middleware to retrieve the token from the request headers
app.use('/api', (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  next();
});

app.use('/api', productRoutes)

const PORT = process.env.PORT || 9002;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
    
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
