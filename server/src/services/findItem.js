const createError = require("http-errors");
const mongoose  = require("mongoose");


const findItemById = async (Model, id, options = {}) => {
  
    try {
       const item = await Model.findById(id, options)
       if (!item) throw createError(404, `Couldn't find ${Model.modelName} with this id`);
       if (item) return item;

    } catch (error) {
        if (error instanceof mongoose.Error) {
            throw createError(400, `Invalid ${Model.modelName} ID`) 
         }
       throw error
    } 

}


module.exports = findItemById;