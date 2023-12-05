const express = require('express');
const usersRouter = require('./users_routes');
const routes = express.Router();


routes.use('/users', usersRouter)


module.exports = routes;