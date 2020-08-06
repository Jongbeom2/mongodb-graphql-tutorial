const mongoose = require('mongoose');
const { Schema } = mongoose;
const postSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tagIds: [{
    type:Schema.Types.ObjectId,
    ref:'Tag'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', postSchema);