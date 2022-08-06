const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { request } = require('express');

const protect = asyncHandler(async(req,res,next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            req.user = await User.findOne(decoded.id).select('-password');

            next()

        }catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Unauthorized.');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Unauthorized.');
    }
})

module.exports = {protect}