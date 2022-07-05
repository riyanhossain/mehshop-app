const express = require('express');
const { userRegister, userLogin, sentUserResetPasswordEmail, userResetPassword, userChangePassword } = require('../controllers/user');
const router = express.Router();

router.post('/register', userRegister);

router.post('/login', userLogin);

router.post('/reset-password-email', sentUserResetPasswordEmail);

router.put('/reset-password', userResetPassword);

router.patch('/change-password', userChangePassword);

module.exports = router;