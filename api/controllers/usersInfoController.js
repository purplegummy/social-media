const asyncHandler = require('express-async-handler');
const User = require('../models/User');


const getUserInfo = asyncHandler(async (req,res) => {
    const displayName = req.params.displayName.toLowerCase();
    const user = await User.findOne({displayName}).select('-password');
    
    if (!user) {
        res.status(404).json({
            err:"User Not Found."
        })
        return;
    } else {
        res.status(200).json(user);
    }




});


module.exports = {
    getUserInfo
}