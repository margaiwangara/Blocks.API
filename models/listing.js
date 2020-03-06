const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const listingSchema = new mongoose.Schema(
  {
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
      trim: true,
      required: [true, 'Please add a listing description'],
      maxlength: [
        500,
        'Listing description cannot be more than 500 characters',
      ],
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
      country: {
        code: String,
        name: String,
      },
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
      required: [true, 'Please enter a listing date'],
    },
    photoMain: {
      type: String,
      default: 'no-image.jpg',
    },
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
      },
    ],
    isPublished: {
      type: Boolean,
      default: true,
    },
    realtor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Realtor',
    },
  },
  {
    timestamps: true,
  },
);

listingSchema.pre('save', async function(next) {
  try {
    const response = await geocoder.geocode(this.address);
    const data = response[0];

    // check if loc exists
    if (!data) return next();

    this.location = {
      type: 'Point',
      coordinates: [data.longitude, data.latitude],
      formattedAddress: data.formattedAddress,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
      country: {
        code: data.countryCode,
        name: data.country,
      },
    };
    next();
  } catch (error) {
    next(error);
  }
});
listingSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lowercase: true });
  next();
});

const Listing = mongoose.model('Listing', listingSchema, 'listings');

module.exports = Listing;
