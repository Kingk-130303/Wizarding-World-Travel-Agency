const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Tour = require("../models/Tour");

router.get("/allUsers", async (req, res) => {
  const user = await User.find({ userType: "User" });

  res.json({ user: user }).status(200);
});

router.get("/allTours", async (req, res) => {
  const tour = await Tour.find({});

  res.json({ tour: tour }).status(200);
});

router.post("/deleteUser", async (req, res) => {
  const userEmail = req.body.email;
  await User.deleteOne({ email: userEmail });
  res.json({}).status(200);
});

router.post("/deleteTour", async (req, res) => {
  const name = req.body.name;
  await Tour.deleteOne({ name: name });
  res.json({}).status(200);
});

router.post("/addtour", async (req, res) => {
  try {
    let tour = await Tour.findOne({ name: req.body.name });
    if (tour) {
      return res
        .status(400)
        .json({ error: "A tour with this name already exists" });
    }
    tour = await Tour.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      duration: req.body.duration,
    });

    res.status(200).json({ message: "Tour created Successfully" });
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.post("/gettour", async (req, res) => {
  try {
    let tour = await Tour.findOne({ name: req.body.name });

    res.status(200).json({ tour: tour});
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.post("/updatetour", async (req, res) => {
    const { tourName, name, description, price, duration } = req.body;
  
    try {
      // Find the tour by tourName
      const tour = await Tour.findOne({ name: tourName });
  
      if (!tour) {
        return res.status(404).json({ error: "Tour not found" });
      }
  
      // Update the tour fields with new data
      tour.name = name;
      tour.description = description;
      tour.price = price;
      tour.duration = duration;
  
      // Save the updated tour
      await tour.save();
  
      res.status(200).json({ message: "Tour package updated successfully" });
    } catch (error) {
      console.error("Error updating tour package:", error);
      res.status(500).json({ error: "An error occurred while updating the tour package" });
    }
  });

module.exports = router;
