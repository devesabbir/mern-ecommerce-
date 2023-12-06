const express = require('express');
const routes = require('./routes');
const morgan = require('morgan');
const cors = require('cors');
const { serverPort } = require('./secret');
const app = express();

    
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


  
app.use('/api/v1/', routes)

 


app.listen(serverPort, (err) => {
    if (err) {
        console.log('There was an error listening')
    } else { 
        console.log(`Server listening on port:${serverPort} http://localhost:${serverPort}/api/v1`) 
    }
})   