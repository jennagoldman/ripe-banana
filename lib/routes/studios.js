const { Router } = require('express');
const Studio = require('../models/Studio');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    Studio
      .create(req.body)
      .then(author => res.send(author))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio
      .find()
      .select({ name: true })
      .then(studios => res.send(studios))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Promise.all([
      Studio
        .findById(req.params.id),
      Film
        .find({ studio: req.params.id })
        .select({ title: true })
    ])
      .then(([studio, films]) => {
        res.send({ ...studio.toJSON(), films });
      })
      .catch(next);
  });
