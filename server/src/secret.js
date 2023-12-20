require('dotenv').config()

const serverPort = process.env.SERVER_PORT || 3002
const mongodbURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/mern_E-commerce2023'
const jwtSecret = process.env.JWT_SECRET || 'sabbir'
const smtUserName = process.env.SMTP_USERNAME
const smtPassword = process.env.SMTP_PASSWORD
const clientURL = process.env.CLIENT_URL
const uploadDIR = process.env.UPLOAD_DIR || './public/images/users'



module.exports = {
    serverPort,
    mongodbURL,
    jwtSecret,
    smtUserName,
    smtPassword,
    clientURL,
    uploadDIR

}