const mongoose = require('mongoose');
const {Schema} = mongoose
const UserSchema = new Schema({
    name:{
        type : String,
        required: true
    },
    email:{
        type : String,
        required: true,
        unique:true
    },
    password:{
        type : String,
        required: true
    },
    userType:{
        type : String,
        required: true
    }
    
},{
    collection: 'User-data' 
})


const User = mongoose.model('UserData', UserSchema)
module.exports = User