const mongoose = require('mongoose');

const countryRevenueSchema = new mongoose.Schema({
  Country: { type: String, required: true },
  YearlyRevenue: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('CountryRevenue', countryRevenueSchema);