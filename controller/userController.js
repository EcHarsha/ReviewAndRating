const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transporter } = require("../service/mailService");

//sign up
const userSignUP = async (req, res) => {
  const { emailId, password } = req.body;
  const userData = new User(req.body);
  try {
    const isUserExists = await User.findOne({ emailId });
    if (isUserExists) {
      return res.status(409).json({
        success: false,
        message: "Email already exist",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(password, salt);
      userData.profilePic = `/uploads/${req.file.filename}`;
      await userData.save();
      return res.status(201).json({
        success: true,
        message: "Registration Successfully",
        userData:userData
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//userLogin
const userLogin = async (req, res) => {
  try {
    const { emailId } = req.body;
    const ifEmailExist = await User.findOne({ emailId });
    if (ifEmailExist) {
      const hashPassword = await bcrypt.compare(
        req.body.password,
        ifEmailExist.password
      );
      const token = jwt.sign({ userId: ifEmailExist._id }, process.env.JWT, {
        expiresIn: "5d",
      });
      if (hashPassword && ifEmailExist) {
        res.status(200).json({
          success: true,
          message: "Login Successfully",
          token: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "UserEmail not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// forgotPassword
const forgotPassword = async (req, res) => {
  const { emailId } = req.body;
  const retrievedUser = await User.findOne({ emailId });
  try {
    if (retrievedUser != null) {
      const token = jwt.sign(
        { userId: retrievedUser._id, userEmail: retrievedUser.emailId },
        process.env.JWT,
        { expiresIn: "1hr" }
      );

      await transporter.sendMail({
        from: process.env.Email,
        to: req.body.emailId,
      });

      return res.status(200).json({
        success: true,
        message: "Mail sent successfully",
        token: token,
        userId: retrievedUser._id,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//reset password
const resetPassword = async (req, res) => {
  const { userId, token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  try {
    const checkUser = await User.findById(userId);
    if (checkUser != null) {
      jwt.verify(token, process.env.JWT, async (err) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
          });
        }
        if (newPassword === confirmPassword) {
          const newUserPassword = await bcrypt.hash(newPassword, 10);
          await User.findByIdAndUpdate(checkUser._id, {
            $set: { password: newUserPassword },
          });
          res.status(200).json({
            success: true,
            message: "Password updated successfully",
          });
        } else {
          res.status(403).json({
            success: false,
            message: "NewPassword and ConfirmPassword do not match",
          });
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  userSignUP,
  userLogin,
  forgotPassword,
  resetPassword
};
