const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    Film
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  });

// .get('/', (req, res, next) => {
//   Studio
//     .find()
//     .select({ name: true })
//     .then(studios => res.send(studios))
//     .catch(next);
// })

// .get('/:id', (req, res, next) => {
//   Studio
//     .findById(req.params.id)
//     .then(studio => res.send(studio))
//     .catch(next);
// });
