const express = require('express');
const { GetUsers, GetUser, DeleteUser, ProcessRegister } = require('../../controllers/UserController/UserController');

const userRoutes = express.Router();

userRoutes.post('/proccess-register', ProcessRegister)
userRoutes.get('/', GetUsers)
userRoutes.get('/:id', GetUser)
userRoutes.delete('/:id', DeleteUser)


module.exports = userRoutes; 