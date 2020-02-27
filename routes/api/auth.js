const express = require('express');

const route = express.Router();

const { registerUser } = require('../../controllers/auth');

route.post('/register', registerUser);

module.exports = route;
