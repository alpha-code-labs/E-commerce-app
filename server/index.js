import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import currencyRoutes from './routes/currencyRoutes.js';
import {   updateCurrencyRatesEveryHour,
  getLatestCurrencyRates,
  performCurrencyConversion } from './controllers/currencyController.js';
  import fileUpload from 'express-fileupload';
  import {v2 as cloudinary} from 'cloudinary';


dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({
  useTempFiles:true
}))

cloudinary.config({ 
  cloud_name: 'dn0csvmfj', 
  api_key: '526948457628338', 
  api_secret: 'VIN-q83CSP2StIZfmg7vtilCaRQ' 
});



const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

updateCurrencyRatesEveryHour();

// API routes
app.use('/api', currencyRoutes);

// ... (previous code)

app.post('/upload', (req, res) => {
  console.log('Received file upload request');
  console.log('Files:', req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }

  // The name of the input field (e.g., "file") is used to retrieve the uploaded file
  const file = req.files.file;

  // Use Cloudinary API to upload the file
  cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
    if (error) {
      console.error('Cloudinary upload error:', error);
      return res.status(500).json({ message: 'File upload failed.' });
    }

    // Log the Cloudinary response for debugging
    console.log('Cloudinary response:', result);

    // Check if the file was successfully uploaded
    if (result && result.secure_url) {
      // You can do something with the uploaded URL, like save it to the database
      // or send it back to the client as a response
      return res.json({ url: result.secure_url });
    } else {
      console.error('Invalid Cloudinary response:', result);
      return res.status(500).json({ message: 'File upload failed.' });
    }
  });
});

// // ... (remaining code)



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

// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import currencyRoutes from './routes/currencyRoutes.js';
// import {   updateCurrencyRatesEveryHour,
//   getLatestCurrencyRates,
//   performCurrencyConversion } from './controllers/currencyController.js';

// dotenv.config();


// const app = express();
// app.use(express.json());
// app.use(cors());

// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;

// updateCurrencyRatesEveryHour();

// // API routes
// app.use('/api', currencyRoutes);

// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
//   })
//   .catch((error) => console.log(`${error} did not connect`));



