const mongoose = require('mongoose');
const { Schema } = mongoose;
const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  friendIds: [{
    type:Schema.Types.ObjectId,
    ref:'Person'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Person', personSchema);