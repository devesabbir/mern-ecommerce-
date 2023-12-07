const User = require("../models/userModel")

const GetUsers = async (req, res, next) => {
    try {
      const users = await User.find()
      if (users) {
          res.json({
          success: true,
          message: 'Get Users successfully',
          data: users
        })
      }
      
    } catch (error) {
       next(error)
    }
   
}


module.exports = {
    GetUsers,
}