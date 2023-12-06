const express = require('express');
const { GetUsers } = require('../controllers/userController');
const userRoutes = express.Router();


userRoutes.get('/', GetUsers)


module.exports = userRoutes; 