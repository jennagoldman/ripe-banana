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

schema.statics.deleteReviewerWithNoReviews = async function(id) {
  const reviews = await this.model('Review')
    .find({ reviewer: id });

  if(reviews.length === 0) {
    return this.findByIdAndDelete(id);
  } else {
    throw new Error('Cannot delete reviewer because they have reviews.');
  }
};

module.exports = mongoose.model('Review', schema);
