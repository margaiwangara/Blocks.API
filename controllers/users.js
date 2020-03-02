const User = require('../models/user');
const asyncHandler = require('../handlers/asyncHandler');
const ExceptionHandler = require('../handlers/ExceptionHandler');

/**
 * @desc Get All Users
 * @route GET /api/users
 * @access Private
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  return res.status(200).json({
    success: true,
    count: users.count,
    data: users,
  });
});

/**
 * @desc Get Single User
 * @route GET /api/users/:id
 * @access Private
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ExceptionHandler('Not Found', 404));

  return res.status(200).json(user);
});

/**
 * @desc Create User
 * @route POST /api/users
 * @access Private
 */
exports.createUser = asyncHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);

  return res.status(201).json(newUser);
});

/**
 * @desc Update existing user
 * @route PUT /api/users/:id
 * @access Private
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json(updatedUser);
});

/**
 * @desc Delete existing user
 * @route DELETE /api/users/:id
 * @access Private
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true,
    data: {},
  });
});
