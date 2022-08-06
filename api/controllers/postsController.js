const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');
const User = require('../models/User');

const makePost = asyncHandler(async (req,res) => {
    const {caption, images} = req.body;
    const user = await User.findById(req.user.id);
    const post = await Post.create({
        user: user.id,
        caption,
        images,

    });
});

module.exports = {
    makePost,

}