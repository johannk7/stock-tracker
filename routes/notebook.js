const express = require('express');
const router = express.Router();
const Notebook = require('../models/Notebook');

// Show notebook
router.get('/', async (req, res) => {
  const stocks = await Notebook.find();
  res.render('notebook', { stocks });
});

// Add stock to notebook
router.post('/add', async (req, res) => {
  const symbol = req.body.symbol.toUpperCase();
  const exists = await Notebook.findOne({ symbol });
  if (!exists) {
    await Notebook.create({ symbol });
  }
  res.redirect('/notebook');
});

// Delete stock from notebook
router.post('/delete/:id', async (req, res) => {
  await Notebook.findByIdAndDelete(req.params.id);
  res.redirect('/notebook');
});

module.exports = router;
