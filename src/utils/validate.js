const isValidEmail = (v) => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
const isValidLength = (v, min, max) => v.length >= min && v.length <= max;
const isAlphabetic = (v) => /^[a-zA-Z ]+$/.test(v);

const emailValidation = [
 {
  validator: function (v) {
   return isValidEmail(v);
  },
  message: "Email must be valid!",
 },
 {
  validator: function (v) {
   return isValidLength(v, 5, 50);
  },
  message: "Email must be between 5 to 50 characters!",
 },
];
const nameValidation = [
 {
  validator: function (v) {
   return isAlphabetic(v);
  },
  message: "Name must contain only letters/spaces!",
 },
 {
  validator: function (v) {
   return isValidLength(v, 2, 20);
  },
  message: "Name must be between 2 to 20 characters!",
 },
];

module.exports = {
 isValidEmail,
 isValidLength,
 isAlphabetic,

 emailValidation,
 nameValidation
};
