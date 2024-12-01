const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const UserController = require("./controllers/UserController");
const InventoryController = require("./controllers/InventoryController");
const PORT = process.env.PORT || 3000;

/* Load environment variables */
if (process.env.NODE_ENV === "development") {
 dotenv.config({ path: path.resolve(__dirname, ".env.local") });
} else {
 dotenv.config();
}

/* express app initialization */
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend/dist")));
app.use(
 cors({
  origin: "*",
 })
);

/* database connection */
mongoose
 .connect(process.env.MONGODB_URI)
 .then(() => console.log("Connected to database"))
 .catch((err) => console.log(err));

/* application routes */
app.get("/api/v1", (req, res) => {
 res.json({
  name: "The Blood Project API",
  version: "1.0.0",
 });
});
app.use("/api/v1/user", UserController);
app.use("/api/v1/inventory", InventoryController);
app.get("*", (req, res) => {
 res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

/* default error handler */
app.use((err, req, res, next) => {
 if (req.headersSent) {
  return next(err);
 }
 res.status(500).json({
  error: err.message || err || "Internal Server Error",
 });
});

app.listen(PORT, () => {
 console.log(
  `Running on http://localhost:${PORT} - ${
   process.env.NODE_ENV || "production"
  } mode`
 );
});

module.exports = app;
