const express = require('express');

const router = express.Router();

const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/users');

const User = require('../../models/user');
const advancedResults = require('../../middleware/advancedResults');

router
  .route('/')
  .get(advancedResults(User), getUsers)
  .post(createUser);
router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
