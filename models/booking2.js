const mongoose = require('mongoose');
const { Schema } = mongoose;
const booking2Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  user2Id: {
    type:Schema.Types.ObjectId,
    ref:'User2'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking2', booking2Schema);