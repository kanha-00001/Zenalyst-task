const express = require('express');
const router = express.Router();
const QuarterlyRevenue = require('../models/QuaterlyRevenue');

// Get all quarterly revenue data
router.get('/', async (req, res) => {
  try {
    const data = await QuarterlyRevenue.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quarterly revenue data', message: err.message });
  }
});

// Get quarterly revenue by customer name
router.get('/:name', async (req, res) => {
  try {
    const data = await QuarterlyRevenue.findOne({ CustomerName: req.params.name });
    if (!data) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customer data', message: err.message });
  }
});

// Bulk upload quarterly revenue data
router.post('/', async (req, res) => {
  try {
    const data = await QuarterlyRevenue.insertMany(req.body, { ordered: false });
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: 'Failed to upload quarterly revenue data', message: err.message });
  }
});


router.delete('/clear', async (req, res) => {
  try {
    await QuarterlyRevenue.deleteMany({});
    res.json({ message: 'Quarterly revenue data cleared successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear quarterly data', message: err.message });
  }
});
module.exports = router;