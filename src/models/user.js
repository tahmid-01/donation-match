const mongoose = require("mongoose");
const crypto = require("crypto");

const { emailValidation, nameValidation } = require("../utils/validate");
const addressSchema = require("./common/address");
const phoneSchema = require("./common/phone");

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
  address: addressSchema,
  phone: phoneSchema,
  profile_photo: {
   type: String,
   default: "/images/avatar.png",
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
 last_token: String,
 password_changed_at: Date,
 password_reset_token: String,
 password_reset_expires: Date,

 donate: [
  {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Donate",
  },
 ],
 request: [
  {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Request",
  },
 ],
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
