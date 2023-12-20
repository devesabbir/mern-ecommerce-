const multer = require('multer'); 
const path = require('path');
const { uploadDIR } = require('../secret');

 
 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDIR)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const extName = path.extname(file.originalname)
      cb(null, file.fieldname  + '_' + uniqueSuffix + extName)
    }
  })
  
  const upload = multer({ storage: storage })



  module.exports = upload;