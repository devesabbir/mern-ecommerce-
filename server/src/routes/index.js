const express = require('express');
const userRoutes = require('./UserRoutes/UserRoutes');
const userSeedRoutes = require('./UserRoutes/SeedRoutes');
const routes = express.Router();


routes.use('/users', userRoutes)
routes.use('/users/seed', userSeedRoutes)

 
module.exports = routes;