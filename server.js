require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactUsRoutes = require('./routes/contactUs');
const getQuoteRoutes = require('./routes/getQuote');
const replicateWebsiteRoutes = require('./routes/replicateWebsite');

const app = express();
const allowedOrigins = ['http://localhost:3000', 'https://launchspark.in'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api', contactUsRoutes);
app.use('/api', getQuoteRoutes);
app.use('/api', replicateWebsiteRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
