const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()

router.post('/',fetchuser,(req,res)=>{
    // console.log(req.email)
    res.json({}).status(200);
})

module.exports = router