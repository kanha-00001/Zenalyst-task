const express = require('express');
const router = express.Router();
const RegionRevenue = require('../models/RegionRevenue');

// Get all region revenue data
router.get('/', async (req, res) => {
  try {
    const data = await RegionRevenue.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch region revenue data', message: err.message });
  }
});

// Bulk upload region revenue data
router.post('/', async (req, res) => {
  try {
    const data = await RegionRevenue.insertMany(req.body, { ordered: false });
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: 'Failed to upload region revenue data', message: err.message });
  }
});

module.exports = router;