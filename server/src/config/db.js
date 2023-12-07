const mongoose = require('mongoose');
const { mongodbURL } = require('../secret');


/**
 * 
 * @param {MongoDb options} options 
 */

const connectDB = async (options = {}) => {
   try {
      await mongoose.connect(mongodbURL, options)
      console.log(`Database connection established.`)
      mongoose.connection.on('error', (err) => {
         console.error('Database connection error:' + err.toString())
      })
   } catch (error) {
      console.log(error)
   } 
} 

module.exports = connectDB;