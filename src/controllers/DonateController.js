const express = require("express");
const mongoose = require("mongoose");

const checkAuth = require("../middlewares/checkAuth");
const donateSchema = require("../models/donate");
const userSchema = require("../models/user");

const router = express.Router();
const Donate = mongoose.model("Donate", donateSchema);
const User = mongoose.model("User", userSchema);

/* GET - get latest 10 donations */
router.get("/latest", async (req, res, next) => {
 try {
  const data = await Donate.find({
   expire_date: { $gte: new Date() },
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

/* GET - get all donations */
router.get("/all", async (req, res, next) => {
 try {
  const data = await Donate.find().sort({ createdAt: -1 }).populate({
   path: "user",
   select: "profile.display_name profile.profile_photo donate",
  });
  res.status(200).json({
   message: "Retrieved all donations!",
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

/* GET - get latest 10 donations by category */
router.get("/category/:category", async (req, res, next) => {
 try {
  const data = await Donate.find({
   category: req.params.category,
   expire_date: { $gte: new Date() },
  })
   .sort({ createdAt: -1 })
   .limit(10)
   .populate({
    path: "user",
    select: "profile.display_name profile.profile_photo donate",
   });
  res.status(200).json({
   message: `Retrieved all donations in category: ${req.params.category}`,
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

/* POST - create new donation */
router.post("/create", checkAuth, async (req, res, next) => {
 try {
  const { category, amount, description, phone, expire_date } = req.body;
  if (category && expire_date && phone) {
   const newDonate = new Donate({
    user: req.userId,
    category,
    phone: {
     code: phone.code,
     number: phone.number,
    },
    expire_date: expire_date,
   });
   if (amount.value) {
    newDonate.amount = amount;
   }
   if (description) {
    newDonate.description = description;
   }
   const savedDonate = await newDonate.save();
   const user = await User.findById(req.userId);
   user.donate.push(newDonate._id);
   await user.save();

   res.status(201).json({
    message: "Donation created!",
    donate: savedDonate,
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

/* DELETE - delete a donation */
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

/* PUT - update a donation*/
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
