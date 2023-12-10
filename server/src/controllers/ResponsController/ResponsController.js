const errorResponse = (res, {statusCode, message}) => {
   const resStatus = statusCode || 500;
   const msg = message || 'Internal Server Error';
   return res.status(resStatus).json({
       success: false,
       message: msg
   })
}


const successResponse = (res, statusCode = 200, payload = {}) => {
   return res.status(statusCode).json({
    success: true,
    ...payload
  })
}



module.exports = { errorResponse, successResponse}