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

router
  .route('/')
  .get(getListings)
  .post(createListing);

router
  .route('/:id')
  .get(getListing)
  .put(updateListing)
  .delete(deleteListing);

router.post('/:id/profile', uploadProfile);

module.exports = router;
