const mongoose = require('mongoose');

const notebookSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notebook', notebookSchema);
