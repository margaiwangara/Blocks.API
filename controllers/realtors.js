const Realtor = require('../models/realtor');
const asyncHandler = require('../handlers/asyncHandler');
const ExceptionHandler = require('../handlers/ExceptionHandler');

/**
 * @route GET /api/realtors
 * @desc Gets all realtors
 * @access Public
 */
exports.getRealtors = asyncHandler(async (req, res, next) => {
  return res.status(200).json(res.advancedResults);
});

/**
 * @route GET /api/realtors/:id
 * @desc Gets single realtor
 * @access Public
 */
exports.getRealtor = asyncHandler(async (req, res, next) => {
  const realtor = await Realtor.findById(req.params.id);

  if (!realtor)
    return next(
      new ExceptionHandler(`Realtor with id ${req.params.id} not found`, 404),
    );
  return res.status(200).json(realtor);
});

/**
 * @route POST /api/realtors
 * @desc Creates new realtors
 * @access Private
 */
exports.createRealtor = asyncHandler(async (req, res, next) => {
  const newRealtor = await Realtor.create(req.body);

  return res.status(201).json(newRealtor);
});

/**
 * @route PUT /api/realtors/:id
 * @desc Updates existing realtor
 * @access Private
 */
exports.updateRealtor = asyncHandler(async (req, res, next) => {
  const updatedRealtor = await Realtor.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
  );

  return res.status(200).json(updatedRealtor);
});

/**
 * @route DELETE /api/realtors/:id
 * @desc Delete an existing realtor
 * @access Private
 */
exports.deleteRealtor = asyncHandler(async (req, res, next) => {
  await Realtor.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    success: true,
    data: {},
  });
});
