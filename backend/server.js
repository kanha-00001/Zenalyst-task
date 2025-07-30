require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const quarterlyRoutes = require('./routes/quarterlyRoutes');
const revenueBridgeRoutes = require('./routes/revenueBridgeRoutes');
const countryRoutes = require('./routes/countryRoutes');
const regionRoutes = require('./routes/regionRoutes');
const customerConcentrationRoutes = require('./routes/customerConcentrationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/v1/quarterly', quarterlyRoutes);
app.use('/api/v1/revenue-bridge', revenueBridgeRoutes);
app.use('/api/v1/countries', countryRoutes);
app.use('/api/v1/regions', regionRoutes);
app.use('/api/v1/customer-concentration', customerConcentrationRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});