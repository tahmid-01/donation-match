const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
 country: {
  type: String,
  validate: {
   validator: (value) => value.length > 1,
   message: "Country must have at least 2 characters.",
  },
 },
 state: {
  type: String,
  validate: {
   validator: (value) => value.length > 1,
   message: "State must have at least 2 characters.",
  },
 },
 city: {
  type: String,
  validate: {
   validator: (value) => value.length > 1,
   message: "City must have at least 2 characters.",
  },
 },
 street: {
  type: String,
  validate: {
   validator: (value) => !value || value.length > 1,
   message: "Street, if provided, must have at least 2 characters.",
  },
 },
 zipcode: {
  type: Number,
  validate: {
   validator: (value) => !value || /^\d{4,10}$/.test(value.toString()),
   message: "Zipcode must be a number with 4 to 10 digits.",
  },
 },
});

module.exports = addressSchema;
