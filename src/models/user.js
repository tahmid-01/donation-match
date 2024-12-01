const mongoose = require("mongoose");
const crypto = require("crypto");
const { emailValidation, nameValidation } = require("../utils/validate");

const userSchema = mongoose.Schema({
 email: {
  type: String,
  required: [true, "Email is required!"],
  unique: true,
  validate: emailValidation,
 },
 password: {
  type: String,
  required: [true, "Password is required!"],
 },
 profile: {
  display_name: {
   type: String,
   required: [true, "Name is required!"],
   validate: nameValidation,
  },
 },
 create_time: {
  type: Date,
  default: Date.now,
 },
 last_login_at: {
  type: Date,
  default: Date.now,
 },
 password_changed_at: Date,
 password_reset_token: String,
 password_reset_expires: Date,
});

userSchema.methods.createpassword_reset_token = function () {
 const resetToken = crypto.randomBytes(32).toString("hex");
 this.password_reset_token = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");
 this.password_reset_expires = Date.now() + 10 * 60 * 1000;
 return resetToken;
};

module.exports = userSchema;

/*iventory: [
  {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Inventory",
  },
 ],*/
