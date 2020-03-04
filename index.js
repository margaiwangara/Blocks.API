const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fse = require('fs-extra');
const connectDB = require('./models');
const errorMiddleware = require('./middleware/error');
const authRoutes = require('./routes/api/auth');
const userRoutes = require('./routes/api/user');
const realtorRoutes = require('./routes/api/realtor');
const listingRoutes = require('./routes/api/listing');

// init
const app = express();

// dotenv config
dotenv.config({ path: path.resolve(__dirname, 'config/config.env') });

// middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// connect db
connectDB();

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/realtors', realtorRoutes);

app.get('/', function(req, res) {
  return res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.post('/', async function(req, res, next) {
  if (!req.files) {
    console.log('No files found');
  }

  try {
    const date = new Date();
    const dir = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
    await fse.ensureDir(`./public/uploads/${dir}`);

    // upload file
    const profile = req.files.profile;

    profile.name = `${Date.now()}_${path.parse(profile.name).ext}`;

    profile.mv(`./public/uploads/${dir}/${profile.name}`, async err => {
      if (err) {
        console.log(err);
        return next(err);
      }

      return res.json({ success: 'It worked' });
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

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

module.exports = app;
