import express from 'express';
import {
  updateCurrencyRatesEveryHour,
  getLatestCurrencyRates,
  performCurrencyConversion,
} from '../controllers/currencyController.js';

const router = express.Router();

router.get('/currency/update', updateCurrencyRatesEveryHour);

router.get('/currency/latest', getLatestCurrencyRates);

router.get('/currency/convert', performCurrencyConversion);

export default router;
