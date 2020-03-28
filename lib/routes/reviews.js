const { Router } = require('express');
const Review = require('../models/Review');
const Reviewer = require('../models/Reviewer');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    Review
      .create(req.body)
      .then(review => res.send(review))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Review
      .find()
      .populate('film', 'title')
      .select({ rating: true, review: true })
      .then(reviews => res.send(reviews))
      .catch(next);
  });
// .get('/:id', (req, res, next) => {
//   Reviewer
//     .findById(req.params.id)
//     .select({ name: true, company: true })
//     .then(reviewer => res.send(reviewer))
//     .catch(next);
// })
// .patch('/:id', (req, res, next) => {
//   Reviewer
//     .findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then(reviewer => res.send(reviewer))
//     .catch(next);
// })
// .delete('/:id', (req, res, next) => {
    
//   Reviewer
//     .findByIdAndDelete(req.params.id)
//     .then(reviewer => res.send(reviewer))
//     .catch(next);
// });
