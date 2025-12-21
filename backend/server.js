const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
// Backend should default to port 5000 to match frontend config and documentation
const PORT = process.env.PORT || 5000;
const API_PREFIX = process.env.API_PREFIX || '/api';

// CORS configuration
const corsOptions = {
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check
app.get('/healthz', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use(API_PREFIX + '/doctors', require('./routes/doctors'));
app.use(API_PREFIX + '/appointments', require('./routes/appointments'));
app.use(API_PREFIX + '/patients', require('./routes/patients'));
app.use(API_PREFIX + '/auth', require('./routes/auth'));
app.use(API_PREFIX + '/analytics', require('./routes/analytics'));

app.listen(PORT, () => {
  console.log(`AyurSetu backend running on port ${PORT}`);
});
