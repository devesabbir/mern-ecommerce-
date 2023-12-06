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
      mongoose.connection.on('error', () => {
         console.error('Database connection error:' + error.toString())
      })
   } catch (error) {
      console.log(error)
   } 
} 

module.exports = connectDB;