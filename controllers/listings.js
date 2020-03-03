const asyncHandler = require('../handlers/asyncHandler');
const ExceptionHandler = require('../handlers/ExceptionHandler');
const Listing = require('../models/listing');
const Realtor = require('../models/realtor');
const Photo = require('../models/photo');
const path = require('path');
const fse = require('node-fs-extra');

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
  // check if realtor exists
  if (req.body.realtor) {
    const realtor = await Realtor.findById(req.body.realtor);
    if (!realtor)
      return next(
        new ExceptionHandler(
          `Realtor with id ${req.body.realtor} not found`,
          404,
        ),
      );
  }

  const newListing = await Listing.create(req.body);

  return res.status(201).json(newListing);
});

/**
 * @route PUT /api/listings/:id
 * @desc Updates an existing listing
 * @access Private
 */
exports.updateListing = asyncHandler(async (req, res, next) => {
  if (req.body.realtor) {
    const realtor = await Realtor.findById(req.body.realtor);
    if (!realtor)
      return next(
        new ExceptionHandler(
          `Realtor with id ${req.body.realtor} not found`,
          404,
        ),
      );
  }
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

/**
 * @route PUT /api/listings/:listingId/profile
 * @desc Upload profile image for listings
 * @access Private
 */
exports.uploadProfile = asyncHandler(async (req, res, next) => {
  // check if listing exists
  const listing = await Listing.findById(req.params.listingId);
  if (!listing)
    return next(
      new ExceptionHandler(
        `Listing with id ${req.params.listingId}  not found`,
        404,
      ),
    );

  // get image
  if (!req.files)
    return next(new ExceptionHandler('Please upload a file', 400));

  const profile = req.files.profile;

  // check if image
  if (!profile.startsWith('image'))
    return next(new ExceptionHandler('Please upload an image file', 400));

  // check size
  if (profile.size > process.env.MAX_FILE_SIZE)
    return next(
      new ExceptionHandler(
        `Max file size of ${process.env.MAX_FILE_SIZE} exceeded`,
        400,
      ),
    );

  // upload file
  profile.name = `${listing._id}_${Date.now()}_${path.parse(profile.name).ext}`;

  // create dir in YYYY/MM/DD structure
  // ./public/uploads/2020/3/3
  const date = new Date();
  const dir = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;

  await fse.ensureDir(dir);

  profile.mv(`${process.env.FILE_UPLOAD_PATH}/${dir}`, async err => {
    if (err) {
      console.log(err);
      return next(new ExceptionHandler('File upload failed', 500));
    }

    await Listing.findByIdAndUpdate(req.params.listingId, {
      photoMain: `${dir}/${profile.name}`,
    });

    return res.status(200).json({
      success: true,
      path: `${dir}/${profile.name}`,
    });
  });
});
