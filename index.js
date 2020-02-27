const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./models');
const errorMiddleware = require('./middleware/error');
const ExceptionHandler = require('./handlers/ExceptionHandler');

// init
const app = express();

// dotenv config
dotenv.config({ path: path.resolve(__dirname, 'config/config.env') });

// middleware
app.use(express.json());

// connect db
connectDB();

// error handling
app.use(function(req, res, next) {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use(errorMiddleware);

// PORT
const PORT = parseInt(process.env.PORT || 5000, 10);

app.listen(PORT, () =>
  console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
