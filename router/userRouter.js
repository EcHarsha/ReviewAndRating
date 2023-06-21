const express = require('express')
const router =express.Router();
const {upload} = require("../middleware/imageStorage")
const validate = require("../validation/user/user_validation")

const user = require("../controller/userController")

router.post("/signup",upload.single("profilePic"),validate.registerUserValidation,user.userSignUP)
router.post("/login", user.userLogin)
router.post("/forgotpassword", user.forgotPassword)
router.post("/resetpassword/:userId/:token", user.resetPassword)

module.exports = router;