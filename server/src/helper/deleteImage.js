const fs = require('fs').promises;

const deleteImage = async (userImagePath) => {
    try {
        await fs.access(userImagePath)
        await fs.unlink(userImagePath)
        console.log('User image Successfully Deleted');

    } catch (error) {
       console.error('User image not found'); 
    }
}


module.exports = deleteImage;