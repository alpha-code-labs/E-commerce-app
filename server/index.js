import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import hrDataRoutes from './routes/hrDataRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import { sendMail } from './controllers/sendmail.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9002;

const MONGO_URI = process.env.MONGO_URI;

app.get('/', (req, res) => {
  res.send('I am a server');
});

app.use('/hrdata', hrDataRoutes);
app.use('/groups', groupRoutes);

app.post('/mail', async (req, res) => {
  try {
    // Call the sendMail function here
    const info = await sendMail(req, res);

    // The sendMail function already sent a response, so no need to send again here
  } catch (error) {
    // If there was an error sending the email, handle it here
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

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
