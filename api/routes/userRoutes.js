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
router.get('/user', protect, getUser);
router.put('/updateAvatar', protect, setAvatarImage)


module.exports = router;