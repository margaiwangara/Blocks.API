const Realtors = require('../models/realtor');
const asyncHandler = require('../handlers/asyncHandler');
const ExceptionHandler = require('../handlers/ExceptionHandler');

/**
 * @route GET /api/realtors
 * @desc Gets all realtors
 * @access PUBLIC
 */
exports.getRealtors = asyncHandler(async (req, res, next) => {
  const realtors = await Realtors.find();

  return res.status(200).json({
    success: true,
    count: realtors.length,
    data: realtors,
  });
});
