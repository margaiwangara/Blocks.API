const mongoose = require('mongoose');

const realtorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a realtor name'],
      maxlength: [100, "Realtor's name cannot be more than 100 characters"],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
      required: [true, 'Please enter an email address'],
    },
    phone: {
      type: String,
      maxlength: [20, 'Phone number can not be longer than 20 characters'],
    },
    isMvp: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String,
      default: 'no-image.jpg',
    },
    hireDate: {
      type: Date,
      required: [true, 'Please enter a hire date'],
    },
  },
  {
    timestamps: true,
  },
);

const Realtor = mongoose.model('Realtor', realtorSchema, 'realtors');

module.exports = Realtor;
