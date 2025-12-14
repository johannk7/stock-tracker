const express = require('express');
const router = express.Router();
const axios = require('axios');

// Search form page
router.get('/search', (req, res) => {
  res.render('search', { error: null });
});

// Search submission
router.post('/search', async (req, res) => {
  const symbol = req.body.symbol.trim().toUpperCase();

  try {
    const response = await axios.get(
      `https://yahoo-finance-real-time1.p.rapidapi.com/stock/get-options?symbol=${symbol}&lang=en-US&region=US`,
      {
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'yahoo-finance-real-time1.p.rapidapi.com'
        }
      }
    );

    const data = response.data;
    const quote = data?.optionChain?.result?.[0]?.quote;

    if (!quote || typeof quote.regularMarketPrice !== 'number') {
      return res.render('search', {
        error: 'Not a valid stock ticker'
      });
    }

    res.render('result', { stock: data });

  } catch (err) {
    console.error(err);
    res.render('search', { error: 'Error fetching stock data' });
  }
});

// Detailed stock page
router.get('/stocks/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();

  try {
    const response = await axios.get(
      `https://yahoo-finance-real-time1.p.rapidapi.com/stock/get-options?symbol=${symbol}&lang=en-US&region=US`,
      {
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'yahoo-finance-real-time1.p.rapidapi.com'
        }
      }
    );

    const data = response.data;
    const quote = data?.optionChain?.result?.[0]?.quote;

    if (!quote || typeof quote.regularMarketPrice !== 'number') {
      return res.render('detailed', {
        stock: null,
        error: 'Not a valid stock ticker'
      });
    }

    res.render('detailed', {
      stock: quote,
      error: null
    });

  } catch (err) {
    console.error(err);
    res.render('detailed', {
      stock: null,
      error: 'Error fetching stock data'
    });
  }
});

module.exports = router;
