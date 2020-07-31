const mongoose = require('mongoose');
const { Schema } = mongoose;
const user1Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  bookings: [{
    type:Schema.Types.ObjectId,
    ref:'Booking1'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User1', user1Schema);