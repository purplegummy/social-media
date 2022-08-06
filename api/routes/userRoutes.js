const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {
    registerUser, 
    getUser, 
    loginUser,
    setAvatarImage
} = require('../controllers/userController');


router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUser);
router.put('/setAvatar',protect, setAvatarImage)


module.exports = router;