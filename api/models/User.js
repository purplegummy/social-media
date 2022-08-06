const mongoose = require('mongoose');

const User =  mongoose.model('User', new mongoose.Schema(
    {
       email:{type: String, unique:true},
       password: {type:String},
       displayName: {type:String, unique:true, lowercase: true},
       avatarImageURL: {type:String, default:'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}
    }
));

module.exports = User;