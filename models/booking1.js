const mongoose = require('mongoose');
const { Schema } = mongoose;
const booking1Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking1', booking1Schema);