const createError = require('http-errors')
const jwt = require('jsonwebtoken');
const User = require("../../models/UserModel/UserModel");
const findItemById = require('../../services/findItem');
const { successResponse } = require('../ResponsController/ResponsController');
const deleteImage = require('../../helper/DeleteImage');
const {jwtSecret, clientURL } = require('../../secret');
const { CreateToken, VerifyToken } = require('../../helper/webToken');
const emailWithNodeMailer = require('../../helper/Email');
const createHttpError = require('http-errors');




const ProcessRegister = async (req, res, next) => {
   


   try {
     const { name, email, password, phone, address} = req.body
     const existUser = await User.findOne({ email:{$eq: email}})

     if (existUser) {
        throw createError(409, 'User Already Registered')
     }

     if (!existUser) {
         
        const token = CreateToken({...req.body}, jwtSecret, 5) 
        
        // Prepare email
        const emailData = {
          email: email,
          subject: 'Account Activation mail',
          html: `
            <h2>Hello ${name} ! </h2>
            <p>Please click here to <a href="${clientURL}/users/verify-register/${token}" target="_blank" > Active 
            your account </a></p>
          
          `
        }

         try {
           await emailWithNodeMailer(emailData)
         } catch (error) {
            next(createHttpError(500, 'Failed to send verification email'))
         }


       return successResponse(res,201, {
        message: 'Please check your verification mail',
        token:token
     })
     }
   } 
   catch (err) { 
      next(err);
   }

} 


const VerifyRegister = async (req, res, next) => {
   
   try {
     const { token } = req?.params
     if (!token) throw createHttpError(404, 'Token required!')

     try {
      const decode = await VerifyToken(token, jwtSecret)
      if (!decode) throw createHttpError(401, 'Unable to verify token')

      const baseUserName = decode.name.trim().replace(/\s/g, '_') + Date.now()
      const user = await User.create({...decode, userName:baseUserName})
      
      return successResponse(res,200, {
      message: 'User created successfully',
      user:user
   })
     } catch (err) {
       if (err.name === "TokenExpiredError") {
        throw createHttpError(401, 'Token expired!')
       } else if (err.name === "JsonWebTokenError") {
        throw createHttpError(401, 'Invalid Token!')
       }  else {
         throw err;
       } 
     }    
   } catch (err) {
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
        return successResponse(res, 200, {
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
    return successResponse(res, 200, {
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
      return  successResponse(res, 200, {
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
    VerifyRegister,
    GetUsers,
    GetUser,
    DeleteUser
}