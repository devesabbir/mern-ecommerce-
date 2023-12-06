const express = require('express');
const userRoutes = require('./UserRoutes');
const routes = express.Router();


routes.use('/users', userRoutes)

 
module.exports = routes;