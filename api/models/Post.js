const mongoose = require('mongoose');

const Post = mongoose.model('Post', new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    caption: {type: String, required: true},
    images: {type: Array, required: false},
    likes: {type: Array, required: false, default: []},
    comments: {type: Array, required: false, default: []},
    date: {type: Date, default: Date.now}



}));

module.exports = Post;