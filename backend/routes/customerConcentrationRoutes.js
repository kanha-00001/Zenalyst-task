
const express = require('express');
const router = express.Router();
const CustomerConcentration = require('../models/CustomerConcentration');

// Get all customer concentration data
router.get('/', async (req, res) => {
  try {
    const data = await CustomerConcentration.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customer concentration data', message: err.message });
  }
});

// Bulk upload customer concentration data
router.post('/', async (req, res) => {
  try {
    const data = await CustomerConcentration.insertMany(req.body, { ordered: false });
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: 'Failed to upload customer concentration data', message: err.message });
  }
});

router.delete('/clear', async (req, res) => {
  try {
    await CustomerConcentration.deleteMany({});
    res.json({ message: 'Quarterly revenue data cleared successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear quarterly data', message: err.message });
  }
});

module.exports = router;