const mongoose = require("mongoose");

const amountSchema = require("./common/amount");
const addressSchema = require("./common/address");
const phoneSchema = require("./common/phone");

const requestSchema = mongoose.Schema(
 {
  user: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User",
   required: true,
  },
  category: {
   type: "String",
   enum: [
    "Blood (A+)",
    "Blood (A-)",
    "Blood (B+)",
    "Blood (B-)",
    "Blood (AB+)",
    "Blood (AB-)",
    "Blood (O+)",
    "Blood (O-)",
    "Cloth",
    "Food",
   ],
   required: [true, "Category is required!"],
  },
  amount: amountSchema,
  relationship: {
   type: String,
   enum: [
    "Self (Man)",
    "Self (Woman)",
    "Spouse",
    "Father",
    "Mother",
    "Son",
    "Daughter",
    "Brother",
    "Sister",
    "Relative (Man)",
    "Relative (Woman)",
    "Unknown",
   ],
   required: [true, "Relationship to patient is required!"],
  },
  address: addressSchema,
  phone: {
   type: phoneSchema,
   required: [true, "Phone number is required!"],
  },
  is_finished: {
   type: "Boolean",
   default: false,
  },
  description: {
   type: "String",
   validate: {
    validator: (description) => description.length <= 200,
    message: "Description must be less than 200 characters!",
   },
  },
 },
 {
  timestamps: true,
 }
);

module.exports = requestSchema;
