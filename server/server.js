const createError = require('http-errors')
const app = require("./src/app")
const connectDB = require("./src/config/db")
const { serverPort } = require('./src/secret')
const { errorResponse } = require('./src/controllers/ResponsController/ResponsController')

// client side error handler
app.use((req, res, next) => {
    next(createError(404, 'Invalid API request'))
})
 
// server side error handler
app.use((err, req, res, next) => {
    return errorResponse(res, {statusCode:err.status, message:err.message})
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