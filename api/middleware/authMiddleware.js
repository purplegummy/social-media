const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');


const protect = asyncHandler(async(req,res,next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(decoded);
            req.user = await User.findOne({id: decoded.id}).select('-password');
            
            next()
        }catch (error) {
            console.log(error);
            throw new Error('Not authorized, token failed');
            
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, token failed 2');
    }
})

module.exports = {protect}