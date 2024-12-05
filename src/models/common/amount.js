const mongoose = require("mongoose");

const amountSchema = mongoose.Schema({
 amount: {
  unit: {
   type: String,
   validate: {
    validator: function (unit) {
     const validUnits = {
      "Blood (A+)": ["mL", "L", "bag"],
      "Blood (A-)": ["mL", "L", "bag"],
      "Blood (B+)": ["mL", "L", "bag"],
      "Blood (B-)": ["mL", "L", "bag"],
      "Blood (AB+)": ["mL", "L", "bag"],
      "Blood (AB-)": ["mL", "L", "bag"],
      "Blood (O+)": ["mL", "L", "bag"],
      "Blood (O-)": ["mL", "L", "bag"],
      Cloth: ["kg", "pcs"],
      Food: ["kg", "pcs", "L", "plate"],
     };
     const category = this.category;
     return validUnits[category] && validUnits[category].includes(unit);
    },
    message: (props) =>
     `Invalid unit '${props.value}' for category '${this.category}'.`,
   },
  },
  value: {
   type: Number,
   min: [0, "Value must be a positive number."],
  },
 },
});

module.exports = amountSchema;
