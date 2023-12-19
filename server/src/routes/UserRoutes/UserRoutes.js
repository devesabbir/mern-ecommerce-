const express = require('express');
const { GetUsers, GetUser, DeleteUser, ProcessRegister, VerifyRegister } = require('../../controllers/UserController/UserController');

const userRoutes = express.Router();


userRoutes.get('/', GetUsers)
userRoutes.get('/:id', GetUser)
userRoutes.get('/verify-register/:token', VerifyRegister)
userRoutes.post('/proccess-register', ProcessRegister)
userRoutes.delete('/:id', DeleteUser)


module.exports = userRoutes; 