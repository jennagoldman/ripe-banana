const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    Film
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Film
      .find()
      .populate('studio', 'name')
      .select({ title: true, released: true })
      .then(films => res.send(films))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .lean()
      .populate('studio', 'name')
      .populate('cast.actor', 'name')
      .populate({ path: 'reviews', select: 'rating review reviewer -film', populate: { path: 'reviewer', select: 'name' } })
      .select('-__v')
      .then(film => res.send(film))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Film
      .deleteReviewerWithNoReviews(req.params.id)
      .then(film => res.send(film))
      .catch(next);
  });
