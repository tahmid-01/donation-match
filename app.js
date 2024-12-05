const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const connectDB = require("./src/utils/mongodb");
const connectCloudinary = require("./src/utils/cloudinary");
const UserController = require("./src/controllers/UserController");
const RequestController = require("./src/controllers/RequestController");
const DonateController = require("./src/controllers/DonateController");

/*** load environment variables */
if (process.env.NODE_ENV === "development") {
 dotenv.config({ path: path.resolve(__dirname, ".env.local") });
} else {
 dotenv.config();
}

/*** express app initialization */
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend/dist")));
app.use(
 cors({
  origin: "*",
 })
);

/*** all connections */
connectDB();
connectCloudinary();

/*** application routes */
app.get("/api/v1", (req, res) => {
 res.json({
  name: "Donation Match API",
  version: "1.0.0",
 });
});
app.use("/api/v1/user", UserController);
app.use("/api/v1/donate", DonateController);
app.use("/api/v1/request", RequestController);
app.get("*", (req, res, next) => {
 if (req.accepts("html")) {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
 } else {
  next();
 }
});

/*** default error handler */
app.use((err, req, res, next) => {
 if (req.headersSent) {
  return next(err);
 }
 res.status(500).json({
  error: err.message || err || "Internal Server Error",
 });
});

/*** server setup */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(
  `Running on http://localhost:${PORT} - ${
   process.env.NODE_ENV || "production"
  } mode`
 );
});

module.exports = app;
