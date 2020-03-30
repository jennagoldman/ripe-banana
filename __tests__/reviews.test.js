const { getReview, getReviews, getReviewer, getFilm } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('review routes', () => {
  it('creates a review', async() => {
    const reviewer = await getReviewer();
    const film = await getFilm();

    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 5,
        reviewer: reviewer._id,
        review: 'Best movie I\'ve ever seen!',
        film: film._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 5,
          reviewer: reviewer._id,
          review: 'Best movie I\'ve ever seen!',
          film: film._id,
          __v: 0
        });
      });
  });

  it('gets all reviews', async() => {
    const reviews = await getReviews();

    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        reviews.forEach(review => {
          expect(res.body).toContainEqual({
            _id: expect.any(String),
            rating: expect.any(Number),
            review: expect.any(String),
            film: {
              _id: expect.any(String),
              title: expect.any(String)
            }
          });
        });
      });
  });

  // it('gets a reviewer by id', async() => {
  //   const reviewer = await getReviewer();

  //   return request(app)
  //     .get(`/api/v1/reviewers/${reviewer._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: reviewer._id,
  //         name: reviewer.name,
  //         company: reviewer.company
  //       });
  //     });
  // });

  // it('updates a reviewer by id', async() => {
  //   const reviewer = await getReviewer();

  //   return request(app)
  //     .patch(`/api/v1/reviewers/${reviewer._id}`)
  //     .send({ name: 'Leonard Maltin' })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         ...reviewer,
  //         name: 'Leonard Maltin'
  //       });
  //     });
  // });

  // it('deletes a reviewer by id', async() => {
  //   const reviewer = await getReviewer();

  //   return request(app)
  //     .delete(`/api/v1/reviewers/${reviewer._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual(reviewer);
  //     });
  // });
});
