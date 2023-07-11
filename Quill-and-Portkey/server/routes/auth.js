const express = require('express')
const router  = express.Router()
const User = require('../models/User')
const {body,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const jwt_secret = "king@123"
var fetchuser = require('../middleware/fetchuser')

 router.post('/createuser',[
    body('email','Enter valid email').isEmail(),
    body('password','Enter long password').isLength({min:5}),
] , async (req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        
    let user = await User.findOne({email: req.body.email})
    if (user){
        return res.status(400).json({error: "A user with this email already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password,salt);
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
    })
    const data = {
        user:{
            id: user.id
        }
    }
    
    const authToken = jwt.sign(data,jwt_secret)
    res.json({authToken})
} catch (error) {
        console.log(error)
        res.status(500).send("Some error occured")
}
})



router.post('/login',[
    body('email','Enter valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
] , async (req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    } 
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email})
        if (!user){
            return res.status(400).json({error: "Login credentials incorrect"})

        }
        const passwordCompare = await bcrypt.compare(password,user.password)
        if (!passwordCompare){
            return res.status(400).json({error: "Login credentials incorrect"})

        }

        const data = {
            user:{
                id: user.id
            }
        }
        
        const authToken = jwt.sign(data,jwt_secret)
        res.json({authToken: authToken})
    } catch (error) {
        console.log(error)
        res.status(500).send("Some error occured")
    }
 
})








router.post('/getuser', fetchuser,async (req,res)=>{
    try {
         UserId = req.user.id;
        
        const user = await User.findById(UserId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error)
            res.status(500).send("Some error occured")
    }
})


module.exports = router