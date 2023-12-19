require('dotenv').config()

const serverPort = process.env.SERVER_PORT || 3002
const mongodbURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/mern_E-commerce2023'
const jwtSecret = process.env.JWT_SECRET || 'sabbir'
 
module.exports = {
    serverPort,
    mongodbURL,
    jwtSecret
}