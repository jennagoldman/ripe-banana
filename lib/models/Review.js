const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer',
    required: true
  },
  review: {
    type: String,
    maxlength: 140,
    required: true
  },
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.film;
      delete ret.__v;
    }
  }
});

schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'review'
});

schema.statics.topReviews = function() {
  return this
    .aggregate([
      {
        '$lookup': {
          'from': 'films', 
          'localField': 'film', 
          'foreignField': '_id', 
          'as': 'film'
        }
      }, {
        '$unwind': {
          'path': '$film'
        }
      }, {
        '$project': {
          '_id': true, 
          'rating': true, 
          'review': true, 
          'film._id': true, 
          'film.title': true
        }
      }, {
        '$limit': 100
      }, {
        '$sort': {
          'rating': -1
        }
      }
    ]);
};

module.exports = mongoose.model('Review', schema);
