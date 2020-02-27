const User = require('../models/user');
const asyncHandler = require('../handlers/asyncHandler');
const ExceptionHandler = require('../handlers/ExceptionHandler');

// Return body
function getTokenResponse(user, status, res) {
  let name = undefined;
  // generate token
  const token = user.generateJSONWebToken();

  if (user.name || user.surname) {
    name = `${user.name} ${user.surname}`;
  }

  return res.status(status).json({
    user: { id: user.id, email: user.email, name: name ? name.trim() : name },
    token,
  });
}

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

  // response function
  getTokenResponse(newUser, 201, res);
});

/**
 * @description Login existing user
 * @route POST /api/auth/login
 * @access PUBLIC
 */
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(
      new ExceptionHandler('Email and Password fields required', 400),
    );

  // login
  const existingUser = await User.findOne({ email }).select('+password');

  // if user does exists
  if (!existingUser)
    return next(
      new ExceptionHandler('Invalid Email. User does not exist', 404),
    );

  // confirm password
  const isMatch = await existingUser.comparePassword(password);
  if (!isMatch)
    return next(new ExceptionHandler('Invalid Email or Password', 401));

  // response function
  getTokenResponse(existingUser, 200, res);
});
