const express = require('express');
const routes = require('./routes');
const morgan = require('morgan');
const cors = require('cors');
const expressSanitizer = require('express-sanitizer')
const rateLimit = require('express-rate-limit')
const createError = require('http-errors')
const { serverPort } = require('./secret');
const connectDB = require('./config/db');
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


// client side error handler
app.use((req, res, next) => {
    next(createError(404, 'Invalid API request'))
})

// server side error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json({
       message:err.message 
    })
})

app.listen(serverPort, async (err) => {
     // connect to Database
    await connectDB() 
    if (err) {
        console.log('There was an error listening')
    } else { 
        console.log(`Server listening on port:${serverPort} http://localhost:${serverPort}/api/v1`) 
    }
})    