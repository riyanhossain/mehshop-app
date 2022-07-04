const express = require('express');
const { userRegister, userLogin, userResetPassword } = require('../controllers/user');
const router = express.Router();

router.post('/register', userRegister);

router.post('/login', userLogin);

router.post('/reset-password', userResetPassword)

module.exports = router;