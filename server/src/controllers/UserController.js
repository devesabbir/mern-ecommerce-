const GetUsers = (req, res, next) => {
    res.json({
        success: true,
        message: 'Get Users successfully'
    })
}


module.exports = {
    GetUsers,
}