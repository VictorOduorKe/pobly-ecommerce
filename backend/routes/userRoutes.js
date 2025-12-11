const express = require('express');
const { getProfile, updateProfile, requestPasswordReset, resetPassword } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();


// Profile
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

// Password reset
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

module.exports = router;
