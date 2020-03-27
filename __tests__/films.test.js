const { getFilm, getFilms, getStudio, getActor } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('film routes', () => {
  it('creates a film', async() => {
    const studio = await getStudio();
    const actor = await getActor();
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Jurassic Park',
        studio: studio._id,
        released: 1993,
        cast: [
          { role: 'Dr. Ian Malcolm', actor: actor._id }
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Jurassic Park',
          studio: studio._id,
          released: 1993,
          cast: [
            { _id: expect.any(String), role: 'Dr. Ian Malcolm', actor: actor._id }
          ],
          __v: 0
        });
      });
  });

  // it('gets all studio names', async() => {
  //   const studios = await getStudios();

  //   return request(app)
  //     .get('/api/v1/studios')
  //     .then(res => {
  //       studios.forEach(studio => {
  //         expect(res.body).toContainEqual({
  //           _id: studio._id,
  //           name: studio.name
  //         });
  //       });
  //     });
  // });

  // it('gets a studio by id', async() => {
  //   const studio = await getStudio();

  //   return request(app)
  //     .get(`/api/v1/studios/${studio._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual(studio);
  //     });
  // });
});
