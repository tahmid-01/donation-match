const express = require("express");
const mongoose = require("mongoose");

const checkAuth = require("../middlewares/checkAuth");
const donateSchema = require("../models/donate");

const router = express.Router();
const Donate = mongoose.model("Donate", donateSchema);

/* GET - get latest 10 donations (unauthorized) */
router.get("/latest", async (req, res, next) => {
 try {
  const data = await Donate.find({
   status: "Ready",
  })
   .sort({ createdAt: -1 })
   .limit(10)
   .populate({
    path: "user",
    select: "profile.display_name profile.profile_photo donate",
   });

  res.status(200).json({
   message: "Retrieved latest donations!",
   data: data.map((d) => ({
    ...d.toObject(),
    user: {
     name: d.user?.profile?.display_name || "Anonymous",
     profile_photo: d.user?.profile?.profile_photo || "/images/avatar.png",
     donation_count: d.user?.donate?.length || 0,
    },
   })),
  });
 } catch (err) {
  return next(err);
 }
});

/* GET - get all donations (authorized) */
router.get("/all", checkAuth, async (req, res, next) => {
 try {
  const data = await Donate.find();
  res.status(200).json({
   message: "Retrieved all donations!",
   data,
  });
 } catch (err) {
  return next(err);
 }
});

/* POST - create new donation (authorized) */
router.post("/create", checkAuth, async (req, res, next) => {
 try {
  const { category, amount, patient } = req.body;
  const newDonate = new Donate({
   user: req.userId,
   category,
   amount,
   patient,
  });
  const savedDonate = await newDonate.save();

  res.status(201).json({
   message: "Donation created!",
   donate: savedDonate,
  });
 } catch (err) {
  return next(err);
 }
});

/* DELETE - delete a donation (authorized) */
router.delete("/:id", checkAuth, async (req, res, next) => {
 try {
  const donate = await Donate.findOne({
   _id: req.params.id,
   user: req.userId,
  });
  if (!donate) {
   return res.status(404).json({ message: "Donation not found" });
  }

  await donate.remove();
  res.status(200).json({ message: "Donation deleted successfully" });
 } catch (err) {
  return next(err);
 }
});

/* PUT - update a donation (authorized) */
router.put("/:id", checkAuth, async (req, res, next) => {
 try {
  const donate = await Donate.findOne({
   _id: req.params.id,
   user: req.userId,
  });
  if (!donate) {
   return res.status(404).json({ message: "Donation not found" });
  }

  const allowedUpdates = ["category", "amount", "patient"];
  const updates = Object.keys(req.body);
  const isValidUpdate = updates.every((update) =>
   allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
   return res.status(400).json({ message: "Invalid update fields" });
  }

  const updatedDonate = await Donate.findByIdAndUpdate(
   req.params.id,
   { $set: req.body },
   { new: true }
  );

  res.status(200).json({
   message: "Donation updated successfully",
   donate: updatedDonate,
  });
 } catch (err) {
  return next(err);
 }
});

module.exports = router;
