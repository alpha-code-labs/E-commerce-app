import mongoose from 'mongoose';

const currencyRateSchema = new mongoose.Schema({
  base: String,
  rates: Object,
  timestamp: { type: Date, default: Date.now }, 
  historicalData: [{ date: Date, rates: Object }], 
});

currencyRateSchema.pre('save', function(next) {
  this.timestamp = new Date();
  next();
});

const CurrencyRate = mongoose.model('CurrencyRate', currencyRateSchema);

export default CurrencyRate;
