const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/allUsers',async(req,res)=>{
    
    const user = await User.find({userType: 'User'})

    res.json({user: user}).status(200);
})



router.post('/deleteUser',async(req,res)=>{
    const userEmail = req.body.email;
    await User.deleteOne({email: userEmail})
    res.json({}).status(200);
})

module.exports = router