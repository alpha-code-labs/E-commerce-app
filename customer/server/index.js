import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { handleAuthenticationError } from './middlewares/verifyToken.js';
import { errorHandler } from './middlewares/errorHandler.js';
import customerRoutes from './routes/customerRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/customer', customerRoutes);

app.use(handleAuthenticationError);
app.use(errorHandler);

const { PORT, MONGO_URI } = process.env;

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
