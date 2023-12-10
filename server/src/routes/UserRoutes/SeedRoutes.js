const express = require('express');
const { CreateUserSeeds } = require('../../controllers/UserController/SeedController');

const userSeedRoutes = express.Router();


userSeedRoutes.post('/', CreateUserSeeds)


module.exports = userSeedRoutes; 