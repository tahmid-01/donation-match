const mongoose = require("mongoose");

const amountSchema = require("./common/amount");
const patientSchema = require("./common/patient");
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
  amount: {
   type: amountSchema,
   required: [true, "Amount {unit & value} is required!"],
  },
  patient: {
   type: patientSchema,
   required: [true, "Patient {name & relationship} is required!"],
  },
  address: addressSchema,
  phone: {
   type: phoneSchema,
   required: [true, "Patient phone {code & number} is required!"],
  },
 },
 {
  timestamps: true,
 }
);

module.exports = requestSchema;
