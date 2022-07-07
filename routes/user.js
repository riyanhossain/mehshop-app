const express = require('express');
const { userRegister, userLogin, sentUserResetPasswordEmail, userResetPassword, userChangePassword, userInfoUpdate } = require('../controllers/user');
const router = express.Router();

router.post('/register', userRegister);

router.post('/login', userLogin);

router.post('/reset-password-email', sentUserResetPasswordEmail);

router.patch('/reset-password', userResetPassword);

router.patch('/change-password', userChangePassword);

router.patch('/update-userinfo', userInfoUpdate)

module.exports = router;