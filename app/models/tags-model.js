const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    default: null,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
