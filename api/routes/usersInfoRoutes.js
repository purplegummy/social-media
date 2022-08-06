const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');

const {
    getUserInfo
} = require('../controllers/usersInfoController');

router.get('/:displayName',getUserInfo)

module.exports = router;