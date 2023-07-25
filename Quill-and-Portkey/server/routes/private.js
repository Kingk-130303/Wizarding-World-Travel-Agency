const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const fetchadmin = require('../middleware/fetchadmin')
const fetchlandinguser = require('../middleware/fetchlandinguser')
const router = express.Router()

router.post('/admin',fetchadmin,(req,res)=>{
    // console.log(req.email)
    res.json({}).status(200);
})

router.post('/user',fetchuser,(req,res)=>{
    // console.log(req.email)
    res.json({email: req.email}).status(200);
})

router.post('/landinguser', fetchlandinguser,(req,res)=>{
    res.json({message: "Invalid Token",status : 400})
})


module.exports = router