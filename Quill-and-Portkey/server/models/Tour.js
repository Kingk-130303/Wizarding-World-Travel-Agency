const mongoose = require('mongoose');
const {Schema} = mongoose
const TourSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
      },
      description: {
        type: String,
        required: true,
      },
      itenary:{
        type: String,
        required: true,
      },
      image:{
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
      date:{
        type: Date,
        required: true,
      },
      capacity:{
        type: Number,
        required: true,
      }
    
},{
    collection: 'Tour-data'
})


const Tour = mongoose.model('TourData', TourSchema)
module.exports = Tour