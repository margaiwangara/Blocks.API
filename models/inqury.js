const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, 'Please enter an inquiry message'],
      trim: true,
      maxlength: [200, 'Inquiry message length cannot be more than 200 chars'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User Id is required for an inquiry'],
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Realtor',
      required: [true, 'Listing Id is required for an inquiry'],
    },
  },
  {
    timestamps: true,
  },
);

const Inquiry = mongoose.model('Inquiry', inquirySchema, 'inquiries');

module.exports = Inquiry;
