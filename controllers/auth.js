const User = require('../models/user');
const asyncHandler = require('../handlers/asyncHandler');
const ExceptionHandler = require('../handlers/ExceptionHandler');

/**
 * @description Register new user
 * @route POST /api/auth/register
 * @access PUBLIC
 */
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(
      new ExceptionHandler('Email and password fields required', 400),
    );

  const newUser = await User.create({ email, password });

  return res.status(201).json(newUser);
});
