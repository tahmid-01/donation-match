const mongoose = require("mongoose");

const amountSchema = mongoose.Schema({
 amount: {
  unit: {
   type: String,
   required: [true, "Amount unit is required!"],
   validate: {
    validator: function (unit) {
     const validUnits = {
      "Blood (A+)": ["mL", "L"],
      "Blood (A-)": ["mL", "L"],
      "Blood (B+)": ["mL", "L"],
      "Blood (B-)": ["mL", "L"],
      "Blood (AB+)": ["mL", "L"],
      "Blood (AB-)": ["mL", "L"],
      "Blood (O+)": ["mL", "L"],
      "Blood (O-)": ["mL", "L"],
      Cloth: ["kg", "pcs"],
      Food: ["kg", "pcs", "L"],
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
   required: [true, "Amount value is required!"],
   min: [0, "Value must be a positive number."],
  },
 },
});

module.exports = amountSchema;
