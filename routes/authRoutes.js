const express = require("express");
const {
    loginController,
    signupController,
    forgotPassword
  } = require("../controller/authController");
  // router object
const router = express.Router();

//  LOGIN || POST

router.post("/userLogin", loginController);

//  SIGNUP || POST

router.post("/userSignup", signupController);

//  FORGOT PASSWORD || POST
router.post("/forgotPassword", forgotPassword);


module.exports = router;