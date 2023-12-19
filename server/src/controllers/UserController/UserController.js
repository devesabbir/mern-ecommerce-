const createError = require('http-errors')
const jwt = require('jsonwebtoken');
const User = require("../../models/UserModel/UserModel");
const findItemById = require('../../services/findItem');
const { successResponse } = require('../ResponsController/ResponsController');
const deleteImage = require('../../helper/DeleteImage');
const {jwtSecret } = require('../../secret');
const { CreateToken, VerifyToken } = require('../../helper/webToken');




const ProcessRegister = async (req, res, next) => {
   try {
     const { name, email, password, phone, address} = req.body
     const existUser = await User.findOne({ email:{$eq: email}})
     if (existUser) {
        throw createError(409, 'User Already Registered')
     }

     if (!existUser) {
         const token = CreateToken({email:email}, jwtSecret, 5) 
         const decoded = VerifyToken(token, jwtSecret)

        successResponse(res,201, {
        message: 'Data Successfully Registered',
        data:decoded,
        token:token
     })
     }
   } 
   catch (err) { 
      next(err);
   }

}


/**
 * 
 * @param {GET} req 
 * @param {ALL USERS} res 
 * @param {*} next
 * @returns 
 */

const GetUsers = async (req, res, next) => {
    try { 
      const search = req.query.search || '';
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 5);

      const searchRegex = new RegExp('.*' + search + '.*', 'i');
      const filter = {
        isAdmin: {$ne: true},
        $or:[
          {name:{$regex: searchRegex}},
          {email:{$regex: searchRegex}},
          {phone: {$regex: searchRegex}}
        ]
      }

      const options = {
        password:0
      }

      const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1 ) * limit);

      if (!users) {
        throw createError(404, "No users found")
      }

      const count = await User.find(filter, options).estimatedDocumentCount()

      if (users) {
        successResponse(res, 200, {
          message: 'Get Users successfully',
          data: users,
          pagination: {
           totaPages: Math.ceil(count / limit),
           currentPage: page,
           previousPage: page - 1 > 0 ? page - 1 : null,
           nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null
         }})
         
      }
      
    } catch (error) {
       next(error)
    }
   
}


/**
 * 
 * @param {ID} req 
 * @param {SINGLE USER} res 
 * @param {*} next 
 * @returns 
 */

const GetUser = async (req, res, next) => {
  try { 
    const id = req.params.id;
    const options = {
      password:0
    }
    const user = await findItemById(User, id, options)
    if (user) 
    successResponse(res, 200, {
       message: 'Get User successfully',
       data: user,
      }
    )
    
     
  } catch (error) {
    next(error)
  }
 
}

/**
 * 
 * @param {ID} req 
 * @param {USER} res 
 * @param {*} next 
 * @returns 
 */

const DeleteUser = async (req, res, next) => {
  try { 
    const id = req.params.id;
   
    
    const user = await User.findByIdAndDelete(id);

    const userImagePath = user?.image;
    
    if (userImagePath) {
      await deleteImage(userImagePath)
    }
    
    if (!user) {
      throw createError(404, "No user found")
    }

    if (user) {
        const {password, ...items} = user._doc
        successResponse(res, 200, {
          message: 'Delete User successfully',
          data:items,
        })
    }
     
  } catch (error) {
     next(error)
  }
 
}


module.exports = {
    ProcessRegister,
    GetUsers,
    GetUser,
    DeleteUser
}