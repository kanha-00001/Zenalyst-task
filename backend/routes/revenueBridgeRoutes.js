const express = require('express');
const router = express.Router();
const RevenueBridge = require('../models/RevenueBridge');

// Get all revenue bridge data
router.get('/', async (req, res) => {
  try {
    const data = await RevenueBridge.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch revenue bridge data', message: err.message });
  }
});

// Get revenue bridge by customer name
router.get('/:name', async (req, res) => {
  try {
    const data = await RevenueBridge.findOne({ CustomerName: req.params.name });
    if (!data) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customer data', message: err.message });
  }
});

// Bulk upload revenue bridge data
router.post('/', async (req, res) => {
  try {
    const data = await RevenueBridge.insertMany(req.body, { ordered: false });
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: 'Failed to upload revenue bridge data', message: err.message });
  }
});

router.delete('/clear', async (req, res) => {
  try {
    await RevenueBridge.deleteMany({});
    res.json({ message: 'Quarterly revenue data cleared successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear quarterly data', message: err.message });
  }
});

module.exports = router;