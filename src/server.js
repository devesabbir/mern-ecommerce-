const express = require('express');
const routes = require('./routes');
const app = express();




app.use('/api/v1/', routes)

app.listen(3001, (err) => {
    if (err) {
        console.log('There was an error listening')
    } else { 
        console.log('Server listening on port:3001 https://localhost:3001') 
    }
})   
  