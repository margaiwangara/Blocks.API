const User = require('../models/user');
const asyncHandler = require('../handlers/asyncHandler');
const ExceptionHandler = require('../handlers/ExceptionHandler');

/**
 * @description Register new user
 * @route POST /api/auth/register
 * @access PUBLIC
 */
exports.registerUser = asyncHandler(async (req, res, next) => {
  if (req.body.role) {
    req.body.role = undefined;
  }

  const newUser = await User.create(req.body);

  // generate token
  const token = newUser.generateJSONWebToken();

  return res.status(201).json({
    user: { id: newUser.id, email: newUser.email },
    token,
  });
});
