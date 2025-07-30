const mongoose = require('mongoose');

const revenueBridgeSchema = new mongoose.Schema({
  CustomerName: { type: String, required: true },
  Quarter3Revenue: { type: Number, default: 0 },
  Quarter4Revenue: { type: Number, default: 0 },
  ChurnedRevenue: { type: Number, default: 0 },
  NewRevenue: { type: Number, default: 0 },
  ExpansionRevenue: { type: Number, default: 0 },
  ContractionRevenue: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('RevenueBridge', revenueBridgeSchema);