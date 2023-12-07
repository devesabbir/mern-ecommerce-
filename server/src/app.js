const express = require('express');
const routes = require('./routes');
const morgan = require('morgan');
const cors = require('cors');
const expressSanitizer = require('express-sanitizer')
const rateLimit = require('express-rate-limit')
const app = express();



const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
	max: 10,
    message: 'To many requests per minute',
})

app.use(expressSanitizer());
app.use(limiter) 
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


  
app.use('/api/v1/', routes)




module.exports = app;

