const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    }
  }
}
// , {
//   toJSON: {
//     virtuals: true
//   }
// }
);

// schema.virtual('films', {
//   ref: 'Film',
//   localField: '_id',
//   foreignField: 'studio'
// });

module.exports = mongoose.model('Studio', schema);
