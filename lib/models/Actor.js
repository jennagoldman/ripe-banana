const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date
  },
  pob: {
    type: String
  }
});

schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'cast.actor'
});

module.exports = mongoose.model('Actor', schema);
