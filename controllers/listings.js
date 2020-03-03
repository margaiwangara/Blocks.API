const Listing = require('../models/listing');
const asyncHandler = require('../handlers/asyncHandler');
const ExceptionHandler = require('../handlers/ExceptionHandler');

/**
 * @route GET /api/listings
 * @desc Gets all listings
 * @access Public
 */
exports.getListings = asyncHandler(async (req, res, next) => {
  return res.status(200).json(res.advancedResults);
});

/**
 * @route GET /api/listings/:id
 * @desc Gets single listing
 * @access Public
 */
exports.getListing = asyncHandler(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing)
    return next(
      new ExceptionHandler(`Listing with id ${req.params.id} not found`, 404),
    );

  return res.status(200).json(listing);
});

/**
 * @route POST /api/listings
 * @desc Creates a new listing
 * @access Private
 */
exports.createListing = asyncHandler(async (req, res, next) => {
  const newListing = await Listing.create(req.body);

  return res.status(201).json(newListing);
});

/**
 * @route PUT /api/listings/:id
 * @desc Updates an existing listing
 * @access Private
 */
exports.updateListing = asyncHandler(async (req, res, next) => {
  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
  );

  return res.status(200).json(updatedListing);
});

/**
 * @route DELETE /api/listings/:id
 * @desc Deletes a listing
 * @access Private
 */
exports.deleteListing = asyncHandler(async (req, res, next) => {
  await Listing.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true,
    data: {},
  });
});
