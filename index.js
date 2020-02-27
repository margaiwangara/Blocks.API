const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./models');

// init
const app = express();

// dotenv config
dotenv.config({ path: path.resolve(__dirname, 'config/config.env') });

// middleware
app.use(express.json());

// connect db
connectDB();

// PORT
const PORT = parseInt(process.env.PORT || 5000, 10);

app.listen(PORT, () =>
  console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
