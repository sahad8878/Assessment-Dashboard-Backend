const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../model/userModle")
const loginController = async (req, res) => {

    try {
    const { username, password } = req.body;

    console.log(req.body,"login body");
    const user = await UserModel.findOne({ email:username });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 ,
      });
      res.status(200).send({
        message: "Login success",
        success: true,
        email:user.email,
        userToken,
      });
    }catch( error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in LOGIN controller ${error.message}`,
    });
    }
}

const signupController = async (req, res) => {
    console.log(req.body,"signpu body");
    try{
    const {
        firstName,
        lastName,
        username,
        password,
      } = req.body;
      const existingUser = await UserModel.findOne({ email: username });
      if (existingUser) {
        return res
          .status(200)
          .send({ message: "user Already Exist", success: false });
      }
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password.trim(), salt);
      const newClient = new UserModel({
        fName:firstName,
        lName:lastName,
        email:username,
        password: hashedPassword,
      });
      await newClient.save();
      res.status(201).send({ message: "signup successfully", success: true });

    }catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: `Error in signup controller ${error.message}`,
        });
    }
}

const forgotPassword = async(req, res) => {
  try {
    console.log(req.body);
    const {username,password} = req.body
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password.trim(), salt);
   const user = await UserModel.findOneAndUpdate({email:username},{$set:{password:hashedPassword}})
   if (!user) {
    return res
      .status(200)
      .send({ message: "Email not found", success: false });
  }else {
    res.status(200).send({
      message: "Password updated",
      success: true
    });
  }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in forgot password controller ${error.message}`,
    });
  }
}
module.exports = {
    loginController,
    signupController,
    forgotPassword
  };
  