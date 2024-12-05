const express = require("express");
const mongoose = require("mongoose");

const checkAuth = require("../middlewares/checkAuth");
const requestSchema = require("../models/request");
const userSchema = require("../models/user");

const router = express.Router();
const Request = mongoose.model("Request", requestSchema);
const User = mongoose.model("User", userSchema);

/* GET - get latest 10 requests */
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
    date: d.createdAt,
    user: {
     name: d.user?.profile?.display_name || "Anonymous",
     profile_photo: d.user?.profile?.profile_photo || "/images/avatar.png",
    },
   })),
  });
 } catch (err) {
  return next(err);
 }
});

/* GET - get all requests */
router.get("/all", async (req, res, next) => {
 try {
  const data = await Request.find().sort({ createdAt: -1 }).populate({
   path: "user",
   select: "profile.display_name profile.profile_photo",
  });
  res.status(200).json({
   message: "Retrieved all donation requests!",
   data: data.map((d) => ({
    ...d.toObject(),
    date: d.createdAt,
    user: {
     name: d.user?.profile?.display_name || "Anonymous",
     profile_photo: d.user?.profile?.profile_photo || "/images/avatar.png",
    },
   })),
  });
 } catch (err) {
  return next(err);
 }
});

/* GET - get request by id */
router.get("/:id", async (req, res, next) => {
 try {
  const data = await Request.findById(req.params.id).populate({
   path: "user",
   select: "email profile.display_name profile.profile_photo",
  });
  if (!data) {
   return res.status(404).json({ message: "Request not found" });
  }
  res.status(200).json({
   message: "Retrieved request by id!",
   data: {
    ...data.toObject(),
    date: data.createdAt,
    user: {
     name: data.user?.profile?.display_name || "Anonymous",
     profile_photo: data.user?.profile?.profile_photo || "/images/avatar.png",
     request_count: data.user?.request?.length || 0,
    },
   },
  });
 } catch (err) {
  return next(err);
 }
});

/* GET - get latest 10 requests by category */
router.get("/category/:category", async (req, res, next) => {
 try {
  const data = await Request.find({
   category: req.params.category,
  })
   .sort({ createdAt: -1 })
   .limit(10)
   .populate({
    path: "user",
    select: "profile.display_name profile.profile_photo",
   });
  res.status(200).json({
   message: `Retrieved latest donation requests for ${req.params.category}!`,
   data: data.map((d) => ({
    ...d.toObject(),
    date: d.createdAt,
    user: {
     name: d.user?.profile?.display_name || "Anonymous",
     profile_photo: d.user?.profile?.profile_photo || "/images/avatar.png",
    },
   })),
  });
 } catch (err) {
  return next(err);
 }
});

/* POST - create new request */
router.post("/create", checkAuth, async (req, res, next) => {
 try {
  const { category, amount, relationship, address, phone, description } =
   req.body;
  if (category && relationship && phone) {
   const newRequest = new Request({
    user: req.userId,
    category,
    relationship,
    phone: {
     code: phone.code,
     number: phone.number,
    },
    is_finished: false,
   });
   if (address) {
    newRequest.address = address;
   }
   if (amount.value) {
    newRequest.amount = amount;
   }
   if (description) {
    newRequest.description = description;
   }
   const savedRequest = await newRequest.save();
   const user = await User.findById(req.userId);
   user.request.push(savedRequest._id);
   await user.save();

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

/* DELETE - delete a request */
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

/* PUT - update a request */
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
