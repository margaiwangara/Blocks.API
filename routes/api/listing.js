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

const Listing = require('../../models/listing');
const advancedResults = require('../../middleware/advancedResults');

router
  .route('/')
  .get(advancedResults(Listing), getListings)
  .post(createListing);

router
  .route('/:id')
  .get(getListing)
  .put(updateListing)
  .delete(deleteListing);

router.post('/:id/profile', uploadProfile);

module.exports = router;
