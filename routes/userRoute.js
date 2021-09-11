const express = require('express');
const { authUser, registerUser, getUserProfile, resetPassword, newpassword } = require('../controllers/userController');
const { protect } = require('../middleware');
const routers = express.Router();

routers.post('/login',authUser)
routers.post('/register', registerUser)
routers.post('/reset', resetPassword)
routers.post('/newpassword',newpassword)
routers.route('/profile').get(getUserProfile)


module.exports = { routers }