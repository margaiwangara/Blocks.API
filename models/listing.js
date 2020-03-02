const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a listing title'],
    unique: true,
    trim: true,
    maxlength: [100, 'Listing title cannot be more than 100 characters'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a listing description'],
    maxlength: [500, 'Listing description cannot be more than 500 character'],
  },
  address: {
    type: String,
    required: [true, 'Please add a listing address'],
  },
  location: {
    // GeoPoint
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  price: {
    type: Number,
    required: [true, 'Please add a listing price'],
  },
  features: {
    bedrooms: Number,
    bathrooms: Number,
    garage: {
      type: Number,
      default: 0,
    },
    sqft: Number,
    lotSize: Number,
  },
  listDate: {
    type: Date,
    default: Date.now,
  },
  photoMain: {
    type: String,
    default: 'no-image.jpg',
  },
  photos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Photo',
    },
  ],
});

const Listing = mongoose.model('Listing', listingSchema, 'listings');

module.exports = Listing;
