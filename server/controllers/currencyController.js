import axios from 'axios';
import CurrencyRate from '../models/currencyRate.js';

const YOUR_APP_ID = 'a8d236fa7d3345e0afbc88390c23215d'; 

const fetchCurrencyRates = async () => {
  try {
    const response = await axios.get(
      `https://openexchangerates.org/api/latest.json?app_id=${YOUR_APP_ID}`
    );
    const currencyRates = response.data;

    const currencyRate = new CurrencyRate({
      base: currencyRates.base,
      rates: currencyRates.rates,
    });
    console.log(currencyRate.rates)

    await currencyRate.save();
    
  } catch (error) {
    console.error('Error fetching currency rates:', error);
  }
};

const updateCurrencyRatesEveryHour = () => {
  // Fetch currency rates immediately
  fetchCurrencyRates();

  // Schedule the next fetch every hour
  setInterval(fetchCurrencyRates, 60 * 60 * 1000); // 1 hour 
};

const getLatestCurrencyRates = async (req, res) => {
  try {
    const latestRates = await CurrencyRate.findOne().sort({ _id: -1 }).exec();
    res.json(latestRates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve currency rates' });
  }
};

const performCurrencyConversion = async (req, res) => {
  const { from, to, amount } = req.query;

  try {
    const latestRates = await CurrencyRate.findOne().sort({ _id: -1 }).exec();

    if (!latestRates) {
      // No latest rates available, fallback to last saved rates
      const lastSavedRates = await CurrencyRate.findOne().sort({ timestamp: -1 }).exec();

      if (!lastSavedRates) {
        return res.status(404).json({ error: 'No currency rates available' });
      }

      const baseCurrency = lastSavedRates.base;
      const rates = lastSavedRates.rates;

      if (!rates[from] || !rates[to]) {
        return res.status(400).json({ error: 'Invalid currency code' });
      }

      const convertedAmount = (amount / rates[from]) * rates[to];

      return res.json({ from, to, amount, convertedAmount });
    }

    const baseCurrency = latestRates.base;
    const rates = latestRates.rates;

    if (!rates[from] || !rates[to]) {
      return res.status(400).json({ error: 'Invalid currency code' });
    }

    const convertedAmount = (amount / rates[from]) * rates[to];

    return res.json({ from, to, amount, convertedAmount });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to perform currency conversion' });
  }
};

export { updateCurrencyRatesEveryHour, getLatestCurrencyRates, performCurrencyConversion,fetchCurrencyRates};
