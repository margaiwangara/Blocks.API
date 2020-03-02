const jwt = require('jsonwebtoken');
const ExceptionHandler = require('../handlers/ExceptionHandler');
const User = require('../models/user');

exports.authRequired = async function(req, res, next) {
  let token;
  const authorization = req.headers.authorization;

  if (!authorization)
    return next(new ExceptionHandler('Invalid credentials', 401));

  // starts with bearer
  if (authorization.startWith('Bearer')) {
    // split
    token = authorization.split(' ')[1];
  }

  // token exists
  if (!token) return next(new ExceptionHandler('Invalid credentials', 401));

  try {
    // decode
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get user by id
    if (!decoded) return next(new ExceptionHandler('Invalid credentials', 401));

    // get user and add to req
    const user = await User.findById(decoded.id);

    if (!user) return next(new ExceptionHandler('Invalid credentials', 401));

    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};

exports.roleRequired = (...roles) =>
  function(req, res, next) {
    if (!roles.includes(req.user.role)) {
      return next(
        new ExceptionHandler('Unauthorized to access this route', 403),
      );
    }
    next();
  };
