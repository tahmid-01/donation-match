const mongoose = require("mongoose");
const { nameValidation } = require("../../utils/validate");

const patientSchema = mongoose.Schema({
 name: {
  type: String,
  required: [true, "Name is required!"],
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

module.exports = patientSchema;
