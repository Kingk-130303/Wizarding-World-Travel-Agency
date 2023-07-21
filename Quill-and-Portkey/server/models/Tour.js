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
      price: {
        type: Number,
        required: true,
      },
      duration:{
        type: String,
        required: true,
      }
    
},{
    collection: 'Tour-data'
})


const Tour = mongoose.model('TourData', TourSchema)
module.exports = Tour