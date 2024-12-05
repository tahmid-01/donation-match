const mongoose = require("mongoose");

const amountSchema = require("./common/amount");
const addressSchema = require("./common/address");
const phoneSchema = require("./common/phone");
const { nameValidation } = require("../utils/validate");

const patientSchema = mongoose.Schema({
 name: {
  type: String,
  validate: nameValidation,
 },
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
  required: [true, "Relationship is required!"],
 },
});

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
  patient: {
   type: patientSchema,
   required: [true, "Patient information is required!"],
  },
  address: addressSchema,
  phone: {
   type: phoneSchema,
   required: [true, "Phone number is required!"],
  },
  status: {
   type: "String",
   enum: ["Pending", "Completed"],
   default: "Pending",
  },
 },
 {
  timestamps: true,
 }
);

module.exports = requestSchema;
