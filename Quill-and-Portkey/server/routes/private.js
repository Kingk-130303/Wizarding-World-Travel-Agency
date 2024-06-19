const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const fetchadmin = require('../middleware/fetchadmin')
const fetchlandinguser = require('../middleware/fetchlandinguser')
const router = express.Router()
const User = require("../models/User");
const Tour = require("../models/Tour");
const Booking = require("../models/Booking");

router.post('/admin',fetchadmin,(req,res)=>{
    // console.log(req.email)
    res.json({}).status(200);
})

router.post('/user',fetchuser,(req,res)=>{
    // console.log(req.email)
    res.json({email: req.email,name: req.name}).status(200);
})

router.post('/landinguser', fetchlandinguser,(req,res)=>{
    res.json({message: "Invalid Token",status : 400})
})

router.get('/tourdata',async (req,res)=>{
    const tour = await Tour.find({});
    // console.log(tour);
    res.json({ tours: tour }).status(200);
})


module.exports = router