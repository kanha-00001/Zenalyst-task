const mongoose = require('mongoose');

const regionRevenueSchema = new mongoose.Schema({
  Region: { type: String, required: true },
  YearlyRevenue: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('RegionRevenue', regionRevenueSchema);