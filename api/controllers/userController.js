const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const hasSymbols = (str) => {
    const regex = /[^a-zA-Z0-9]/;
    return regex.test(str);
}
const registerUser = asyncHandler(async (req,res) => {
    const {email,password, displayName} = req.body;
    
    if (!email || !password || !displayName) {
        res.status(400).json({error: 'Fields cannot be empty.'});
        throw new Error('Fields are empty.');
    }
    if (hasSymbols(displayName)) {
        res.status(400).json({error: 'Display name cannot contain special characters.'});
        throw new Error('Display name cannot contain special characters.');
    }
    const emailAlreadyExists = await User.findOne({email});
    const displayNameExists = await User.findOne({displayName});
    if (emailAlreadyExists){
        res.status(400).json({error: 'A User With That Email Already Exists'});
        return;

    }
    if (displayNameExists) {
        res.status(400).json({error: 'A User With That Display Name Already Exists'});
        return;

    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        email,
        password:hashedPassword,
        displayName,
        
    })

    if (user) {
        res.status(201).json({
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            avatarImageURL: user.avatarImageURL,
            token: generateToken(user.id),
        }
            
        )
    } else {
        res.status(400).json({error: 'Invalid Data'});
       
    }

})

const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    const isNotWrongCred =await bcrypt.compare(password, user.password);
    if (user && isNotWrongCred){
        res.status(200).json({
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            avatarImageURL: user.avatarImageURL,
            token: generateToken(user.id),
        })
    } 
    if (!isNotWrongCred) {
        res.status(403).json({error: 'Password or email is incorrect.'});
    
    } else {
        res.status(400).json({error: 'invalid data.'});
    
    }


})

const getUser = asyncHandler(async (req,res) => {
    const {id, displayName, email} = await User.findById(req.user.id);

    res.status(200).json({
        id,
        email,
        displayName
    })
})


const setAvatarImage = asyncHandler(async (req,res) => {
    const {avatarImageURL} = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, {avatarImageURL});

    if (user){
        res.status(204).json({
            message: `Successfully updated ${user.displayName}'s avatar.`
        })
    } else {
        res.status(400).json({
            error: 'We could not update the image for the user.'
        })
    }


});


const generateToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET_KEY, {expiresIn: '30d'})

}
module.exports = {
    registerUser,
    loginUser,
    getUser,
    setAvatarImage
}