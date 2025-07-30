const mongoose = require('mongoose');

const quarterlyRevenueSchema = new mongoose.Schema({
  CustomerName: { type: String, required: true },
  Quarter3Revenue: { type: Number, default: 0 },
  Quarter4Revenue: { type: Number, default: 0 },
  Variance: { type: Number },
  PercentageOfVariance: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('QuarterlyRevenue', quarterlyRevenueSchema);