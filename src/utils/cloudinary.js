const cloudinary = require("cloudinary");

module.exports = () => {
 cloudinary.v2.config(process.env.CLOUDINARY_NAME);
};
