const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Tour = require('../models/Tour')
const Booking = require('../models/Booking')



router.get('/allTours',async(req,res)=>{
    const tour = await Tour.find({})
    res.json({tour: tour}).status(200);
})

router.post('/booktour', async(req,res)=>{
    try {
    let Book = await Booking.find({useremail: req.body.useremail,tourname: req.body.tourname})
    if (Book.length > 0){
        return res.json({data: "Looks like you have already booked this tour"}).status(204);
    }
     Book = await Booking.create({useremail: req.body.useremail,tourname: req.body.tourname})
    res.json({data:"Booking done succesfully"}).status(200)
}
    catch (error) {
        console.log(error)
    }
})

router.post('/userbookings', async(req,res)=>{
    try {
    let Book = await Booking.find({useremail: req.body.useremail})
    if (Book.length > 0){
        return res.json({data: Book}).status(200);
    }
    else{
    res.json({data:"You don't have any bookings yet"}).status(404)
    }
}
    catch (error) {
        console.log(error)
    }
})


module.exports = router