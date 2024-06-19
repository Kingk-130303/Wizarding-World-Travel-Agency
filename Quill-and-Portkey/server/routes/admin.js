const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Tour = require("../models/Tour");
const Booking = require("../models/Booking");
const {body,validationResult} = require('express-validator')


router.get("/allUsers", async (req, res) => {
  const user = await User.find({});

  res.json({ user: user }).status(200);
});

router.get("/allTours", async (req, res) => {
    const tour = await Tour.find({});
    res.json({ tour: tour }).status(200);
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
      itenary: req.body.itenary,
      image: req.body.image,
      price: req.body.price,
      date: req.body.date,
      capacity: req.body.capacity,
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

  


  router.post("/tourreg", async (req, res) => {
    const tourName = req.body.tourname;
  
    try {
        const users = await Booking.find({tourname: tourName});
       
        if (users.length === 0){
          
          return res.json({message: "No registrations yet"}).status(404)
        }
        res.json({data: users}).status(200);
      }
     catch (error) {
      console.log(error)
    }
  });



  router.post("/removetouruser", async (req, res) => {
    const useremail = req.body.useremail;
    const tourname = req.body.tourname;
  
    try {
        await Booking.deleteOne({useremail: useremail,tourname : tourname})
        res.json({message: "deleted successfully"}).status(200);
      }
     catch (error) {
      console.log(error)
    }
  });

  router.post("/findreguser", [
    body('useremail','Enter valid email').isEmail(),
] , async (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()){
      return res.status(400).json({message: "Invalid email",status : 400})
  }
    const useremail = req.body.useremail;
 
  
    try {
      const user = await User.findOne({ email: useremail });
      if (!user) {
        
        return res.json({ message: "User with this email is not registered in our system" ,status: 404}).status(404);
      }
      res.json({message: "User exists in our system",status: 200}).status(200)
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred while finding the user",status: 500 });
    }
  });
  


  router.post("/addtouruser", async (req, res) => {
    try {
      const useremail = req.body.useremail;
      const tourname = req.body.tourname;
  
      const touruser = await Booking.findOne({ useremail: useremail, tourname: tourname });
      if (touruser) {
        
        return res.json({ message: "User with this email has already registered in this tour package" ,status: 409});
      }
     
      await Booking.create({ useremail: useremail, tourname: tourname });
      res.json({ message: "User added successfully" ,status : 200});

    } catch (error) {
      
      res.status(500).json({ error: "An error occurred while adding the user to the tour package",status: 500 });
    }
  });
  
  

module.exports = router;
