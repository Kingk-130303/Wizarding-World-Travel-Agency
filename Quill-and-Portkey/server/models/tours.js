const mongoose = require('mongoose');
const {Schema} = mongoose
const TourSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    
},{
    collection: 'Tour-data'
})


const Tour = mongoose.model('TourData', TourSchema)
module.exports = Tour