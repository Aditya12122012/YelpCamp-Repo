const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const passport = require('passport');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const {storeReturnTo} = require('../middleware');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.registerUser))


router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), catchAsync(users.loginUser))

router.get('/logout', users.logoutUser)

module.exports = router;