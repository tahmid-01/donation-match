const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const checkAuth = require("../middlewares/checkAuth");
const userSchema = require("../models/user");

const router = express.Router();
const User = mongoose.model("User", userSchema);

/* GET - get current user */
router.get("/me", checkAuth, async (req, res, next) => {
 try {
  const data = await User.findOne({ _id: req.userId }).select(
   "profile email create_time last_login_at password_changed_at"
  );
  res.status(200).json({
   message: "Successfully retrieved user!",
   data,
  });
 } catch (err) {
  return next(err);
 }
});

/* POST - create a new user */
router.post("/signup", async (req, res, next) => {
 if (req.body.display_name && req.body.password && req.body.email) {
  const newUser = new User({
   password: bcrypt.hashSync(req.body.password, 10),
   email: req.body.email,
   profile: {
    display_name: req.body.displayName,
   },
   create_time: Date.now(),
   last_login_at: Date.now(),
  });
  try {
   const data = await newUser.save();
   res.status(201).json({
    message: "Successfully created a new user!",
   });
  } catch (err) {
   return next(err);
  }
 } else {
  res.status(400).json({
   error: "Please provide all required fields!",
  });
 }
});

/* POST - login a user */
router.post("/login", async (req, res, next) => {
 try {
  if (req.body.auth) {
   checkAuth(req, res, (msg) => {
    if (msg) {
     next(msg);
    } else {
     User.updateOne(
      { _id: req.userId },
      {
       $set: {
        last_login_at: new Date(),
       },
      }
     );
     res.status(200).json({
      message: "Successfully logged in!",
      data: {
       uid: req.userId,
       profile: {
        email: req.email,
        ...req.profile,
       },
      },
     });
    }
   });
  } else {
   let reqObj = {};
   if (req.body.display_name) reqObj = { display_name: req.body.display_name };
   else if (req.body.email) reqObj = { email: req.body.email };
   else {
    res.status(400).json({
     error: "Please provide name or email!",
    });
    return;
   }
   const user = await User.findOne(reqObj);
   if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
     const token = jwt.sign(
      {
       userId: user._id,
      },
      process.env.JWT_SECRET,
      {
       expiresIn: "14d",
      }
     );
     await User.updateOne(
      { _id: user._id },
      {
       $set: {
        last_token: token,
        last_login_at: new Date(),
       },
      }
     );
     res.status(200).json({
      message: "Successfully logged in!",
      auth: token,
     });
    } else {
     res.status(401).json({
      error: "Authentication failed!",
     });
    }
   } else {
    res.status(401).json({
     error: "Authentication failed!",
    });
   }
  }
 } catch (err) {
  return next(err);
 }
});

/* POST - logout a user */
router.post("/logout", checkAuth, async (req, res, next) => {
 try {
  await User.updateOne(
   { _id: req.userId },
   {
    $set: {
     last_token: "",
    },
   }
  );
  res.status(200).json({
   message: "Successfully logged out!",
  });
 } catch (err) {
  return next(err);
 }
});

/* POST - forgot password */
router.post("/forgot-password", async (req, res, next) => {
 try {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
   return next("User not found!");
  }
  const resetToken = user.createpassword_reset_token();
  const resetUrl =
   process.env.RESETPASS_URL ||
   `${req.protocol}://${req.get("host")}/reset-password/${resetToken}`;

  await user.save({ validateBeforeSave: false });
  try {
   await sendEmail(
    user.email,
    `[${process.env.APP_NAME}] Password Reset Email`,
    `We have recieved a pasword reset request. Please use the link below to reset your password: \n\n${resetUrl}\n\nThis link will expire in 10 minutes.`
   );
   res.status(200).json({
    message: "Successfully sent password reset email!",
   });
  } catch (e) {
   user.password_reset_token = undefined;
   user.password_reset_expires = undefined;
   await user.save({ validateBeforeSave: false });
   return next(e);
  }
 } catch (err) {
  return next(err);
 }
});

/* PATCH - reset password */
router.patch("/reset-password/:token", async (req, res, next) => {
 const token = crypto
  .createHash("sha256")
  .update(req.params.token)
  .digest("hex");
 const user = await User.findOne({
  password_reset_token: token,
  password_reset_expires: { $gt: Date.now() },
 });
 if (!user) {
  return next("Token is invalid or has expired!");
 }
 /* Validate password */
 if (!req.body.password) {
  return next("Please provide a new password!");
 } else if (req.body.password.length < 5) {
  return next("Password must be at least 5 characters long!");
 } else if (req.body.password.length > 51) {
  return next("Password must be shorter than 50 characters!");
 }
 user.password = bcrypt.hashSync(req.body.password, 10);
 user.password_reset_token = undefined;
 user.password_reset_expires = undefined;
 user.password_changed_at = Date.now();

 await user.save();

 res.status(200).json({
  message: "Successfully reset password!",
 });
});

module.exports = router;
