const { getStudio, getStudios } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('studio routes', () => {
  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'PNW Studios',
        address: {
          city: 'Portland',
          state: 'OR',
          country: 'United States'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'PNW Studios',
          address: {
            city: 'Portland',
            state: 'OR',
            country: 'United States'
          },
          __v: 0
        });
      });
  });

  it('gets all studio names', async() => {
    const studios = await getStudios();

    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        studios.forEach(studio => {
          expect(res.body).toContainEqual({
            _id: studio._id,
            name: studio.name
          });
        });
      });
  });

  it('gets a studio by id', async() => {
    const studio = await getStudio();

    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual(studio);
      });
  });
});
