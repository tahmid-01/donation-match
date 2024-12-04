const mongoose = require("mongoose");

const phoneSchema = mongoose.Schema({
 code: {
  type: String,
  required: [true, "Phone code is required!"],
  validate: {
   validator: (value) => /^\+\d{1,4}$/.test(value),
   message: "Phone code must be in the format +[1-4 digits] (e.g., +1, +880).",
  },
 },
 number: {
  type: Number,
  required: [true, "Phone number is required!"],
  validate: {
   validator: (value) => /^\d{6,15}$/.test(value.toString()),
   message: "Phone number must be 6 to 15 digits long.",
  },
 },
});

module.exports = phoneSchema;
