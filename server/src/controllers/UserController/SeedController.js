const User = require("../../models/UserModel/UserModel")
const { usersData } = require("../../models/UserModel/dummyData")


/**
 *  This controller is for users seeding with dummy data
 * @param {POST} req 
 * @param {*} res 
 * @param {*} next 
 */


const CreateUserSeeds = async (req, res, next) => {
   try {
     await User.deleteMany()

     const users = await User.insertMany(usersData)

     res.status(200)
     res.json({
       success: true,
       message: 'Success',
       data: users
     })

   } catch (error) {
      next(error)
   }
}


module.exports = {
    CreateUserSeeds,
}