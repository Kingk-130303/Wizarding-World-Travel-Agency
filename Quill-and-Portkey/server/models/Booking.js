// models/Booking.js
const mongoose = require('mongoose');
const {Schema} = mongoose

const BookingSchema = new Schema({
  useremail: {
    type:String,
    ref: 'User',
    required: true,
  },
  tourname: {
    type:String,
    ref: 'Tour',
    required: true,
  },
  // Add other booking details here as needed
},{
    collection: 'Booking-data'
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
