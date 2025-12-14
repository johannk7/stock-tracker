const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  symbol: String,
  data: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("StockSearch", stockSchema);
