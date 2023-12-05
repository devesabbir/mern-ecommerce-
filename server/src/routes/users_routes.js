const express = require('express');
const usersRouter = express.Router();


usersRouter.get('/all', (req, res) => {
   res.send('Users')
})


module.exports = usersRouter