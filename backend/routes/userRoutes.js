const express=require('express');
const router=express.Router();
const {registerUser,loginUser,userInfo} = require('../controllers/userController')
const {protect} = require("../middleware/authMiddleware")

router.route('/login').post(loginUser)
router.route('/').post(registerUser)

router.get('/info',protect, userInfo)

module.exports = router