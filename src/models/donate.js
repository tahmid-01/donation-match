const mongoose = require("mongoose");

const amountSchema = require("./common/amount");

const donateSchema = mongoose.Schema(
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
  },
  status: {
   type: "String",
   enum: ["Ready", "Busy", "Unavailable"],
   default: "Ready",
  },
  requested: [
   {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
   },
  ],
 },
 {
  timestamps: true,
 }
);

module.exports = donateSchema;
