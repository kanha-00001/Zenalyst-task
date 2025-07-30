const express = require('express');
const router = express.Router();
const CountryRevenue = require('../models/CountryRevenue');

// Get all country revenue data
router.get('/', async (req, res) => {
  try {
    const data = await CountryRevenue.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch country revenue data', message: err.message });
  }
});

// Bulk upload country revenue data
router.post('/', async (req, res) => {
  try {
    const data = await CountryRevenue.insertMany(req.body, { ordered: false });
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: 'Failed to upload country revenue data', message: err.message });
  }
});

module.exports = router;