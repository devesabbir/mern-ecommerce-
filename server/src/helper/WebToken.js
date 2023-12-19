const jwt = require('jsonwebtoken');

const CreateToken = (data, key, exp = 5) => {
    try {
       if (typeof data !== 'object' || !data) {
         throw new Error('Payaload must be an non empty object')
       } 

       if (typeof key !== 'string' || !key) {
          throw new Error('Secret key must be a string')
       }

       const token = jwt.sign(data, key, {expiresIn: Number(exp) * 60 * 5}) 
       return token;

    } catch (error) {
        throw error;
    }
}

const VerifyToken = (token, key) => {
    try {
        if (typeof token !== 'string' || !token) { 
            throw new Error('Invalid token')
        }

        if (typeof key !== 'string' || !key) {
            throw new Error('Invalid key')
        }

        const decoded = jwt.verify(token, key) 
        return decoded;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    CreateToken,
    VerifyToken
}