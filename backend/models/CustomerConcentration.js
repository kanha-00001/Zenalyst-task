const mongoose = require('mongoose');

const customerConcentrationSchema = new mongoose.Schema({
  CustomerName: { type: String, required: true },
  TotalRevenue: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('CustomerConcentration', customerConcentrationSchema);