import mongoose from 'mongoose';

const currencyConversionSchema = new mongoose.Schema({
  from: {
    type: String,
    required: false,
  },
  to: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: false,
  },
  convertedAmount: {
    type: Number,
    required: false,
  },
  // Add any other relevant fields here
}, {
  timestamps: true, // This will automatically add createdAt and updatedAt fields
});

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  productId: mongoose.Types.ObjectId,
  productName: { type: String, required: false },
  currencyConversion: currencyConversionSchema, // Embed the CurrencyConversion schema as a sub-document
});

export const Notification = mongoose.model('Notification', notificationSchema);
