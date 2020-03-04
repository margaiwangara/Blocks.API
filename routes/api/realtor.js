const express = require('express');

// router
const router = express.Router();

// controller methods
const {
  getRealtor,
  getRealtors,
  createRealtor,
  updateRealtor,
  deleteRealtor,
} = require('../../controllers/realtors');

const Realtor = require('../../models/realtor');
const advancedResults = require('../../middleware/advancedResults');

router
  .route('/')
  .get(advancedResults(Realtor), getRealtors)
  .post(createRealtor);

router
  .route('/:id')
  .get(getRealtor)
  .put(updateRealtor)
  .delete(deleteRealtor);

module.exports = router;
