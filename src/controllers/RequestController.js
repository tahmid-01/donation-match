const express = require("express");
const mongoose = require("mongoose");

const checkAuth = require("../middlewares/checkAuth");
const requestSchema = require("../models/request");
const userSchema = require("../models/user");

const router = express.Router();
const Request = mongoose.model("Request", requestSchema);
const User = mongoose.model("User", userSchema);

/* GET - get latest 10 requests (unauthorized) */
router.get("/latest", async (req, res, next) => {
 try {
  const data = await Request.find().sort({ createdAt: -1 }).limit(10).populate({
   path: "user",
   select: "profile.display_name profile.profile_photo",
  });
  res.status(200).json({
   message: "Retrieved latest donation requests!",
   data: data.map((d) => ({
    ...d.toObject(),
    user: {
     name: d.user?.profile?.display_name || "Anonymous",
     profile_photo: d.user?.profile?.profile_photo || "default.png",
    },
   })),
  });
 } catch (err) {
  return next(err);
 }
});

/* GET - get all requests (authorized) */
router.get("/all", checkAuth, async (req, res, next) => {
 try {
  const data = await User.find();
  res.status(200).json({
   message: "Retrieved all donation requests!",
   data,
  });
 } catch (err) {
  return next(err);
 }
});

/* POST - create new request (authorized) */
router.post("/create", checkAuth, async (req, res, next) => {
 try {
  const { category, amount, patient, address, phone } = req.body;
  if (!category || !amount || !patient || !phone) {
   const newRequest = new Request({
    user: req.userId,
    category,
    amount,
    patient,
    address,
    phone,
   });
   const savedRequest = await newRequest.save();

   res.status(201).json({
    message: "Donation request created!",
    request: savedRequest,
   });
  } else {
   res.status(400).json({
    error: "Please provide all required fields!",
   });
  }
 } catch (err) {
  return next(err);
 }
});

/* DELETE - delete a request (authorized) */
router.delete("/:id", checkAuth, async (req, res, next) => {
 try {
  const request = await Request.findOne({
   _id: req.params.id,
   user: req.userId,
  });
  if (!request) {
   return res.status(404).json({ message: "Request not found" });
  }

  await request.remove();
  res.status(200).json({ message: "Request deleted successfully" });
 } catch (err) {
  return next(err);
 }
});

/* PUT - update a request (authorized) */
router.put("/:id", checkAuth, async (req, res, next) => {
 try {
  const request = await Request.findOne({
   _id: req.params.id,
   user: req.userId,
  });
  if (!request) {
   return res.status(404).json({ message: "Request not found" });
  }

  const allowedUpdates = ["category", "amount", "patient"];
  const updates = Object.keys(req.body);
  const isValidUpdate = updates.every((update) =>
   allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
   return res.status(400).json({ message: "Invalid update fields" });
  }

  const updatedRequest = await Request.findByIdAndUpdate(
   req.params.id,
   { $set: req.body },
   { new: true }
  );

  res
   .status(200)
   .json({ message: "Request updated successfully", request: updatedRequest });
 } catch (err) {
  return next(err);
 }
});

module.exports = router;
