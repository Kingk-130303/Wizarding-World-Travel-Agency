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
        return res.status(400).json({error: "Invalid email or password\nPassword needs to be atleast 5 characters long"})
    }
    try {
    let user = await User.findOne({email: req.body.email})
    if (user){
        return res.status(400).json({error: "Check your email again"})
    }
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password,salt);
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
        userType: req.body.userType 
    })

   res.sendStatus(200)

} catch (error) {
    
        console.log(error)
        res.status(500).send("Some error occured")
}
})



router.post(
    '/login',
    [
      body('email', 'Enter valid email').isEmail(),
      body('password', 'Password cannot be blank').exists(),
    ],
    async (req, res) => {
      const jwtToken = req.cookies.jwtToken;
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ error: 'Login credentials incorrect' });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
          return res.status(400).json({ error: 'Login credentials incorrect' });
        }
        // console.log(user.userType)
        const payload = {
          email: user.email,
          usertype: user.userType
        }
        const token = jwt.sign(payload,jwt_secret,{expiresIn: '1d'})
        res.json({
          token : token,
          user: user
        }).status(200)
        
      } catch (error) {
        // console.log(error);
        res.status(500).send('Some error occurred');
      }
    }
  );
  



module.exports = router