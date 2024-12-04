const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = require("../models/user");
const User = mongoose.model("User", userSchema);

const checkAuth = async (req, res, next) => {
 const { authorization } = req.headers;
 try {
  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { userId } = decoded;
  const { email, profile } = await User.findOne({ _id: userId }).select(
   "email profile"
  );

  req.token = token;
  req.userId = userId;
  req.email = email;
  req.profile = profile;

  await User.updateOne(
   { _id: userId },
   {
    $set: {
     last_login_at: new Date(),
    },
   }
  );
  next();
 } catch {
  next("Authentication failed!");
 }
};

module.exports = checkAuth;
