const express = require('express');

// router
const router = express.Router();

// controller methods
const {
  getListing,
  getListings,
  updateListing,
  createListing,
  uploadProfile,
  deleteListing,
} = require('../../controllers/listings');

// middleware
const { roleRequired, authRequired } = require('../../middleware/auth');
const Listing = require('../../models/listing');
const advancedResults = require('../../middleware/advancedResults');

router
  .route('/')
  .get(advancedResults(Listing), getListings)
  .post(authRequired, roleRequired('admin'), createListing);

router
  .route('/:id')
  .get(getListing)
  .put(authRequired, roleRequired('admin'), updateListing)
  .delete(authRequired, roleRequired('admin'), deleteListing);

router.put('/:id/profile', authRequired, roleRequired('admin'), uploadProfile);

module.exports = router;
