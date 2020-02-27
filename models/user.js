const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: [100, 'Name length should be less than 100chars'],
    },
    surname: {
      type: String,
      maxlength: [100, 'Surname length should be less than 100chars'],
    },
    email: {
      type: String,
      required: [true, 'Email field is required'],
      match: [
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        'Please enter a valid email',
      ],
      unique: true,
      maxlength: [50, 'Email length should be less than 50chars'],
    },
    password: {
      type: String,
      required: [true, 'Password field is required'],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        'Please enter a valid password, at least one lowercase and uppercase letter and one number',
      ],
      minlength: [6, 'Password length should be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: [true, 'Role field is required'],
    },
    profileImage: {
      type: String,
      default: 'no-image.jpg',
      maxlength: [255, 'Image name length should be less than 255chars'],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.Model('User', userSchema, 'users');

module.exports = User;
