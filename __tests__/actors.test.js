const { getActor, getActors } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('actor routes', () => {
  it('creates a new actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Jenna Goldman',
        pob: 'Los Gatos, CA'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Jenna Goldman',
          pob: 'Los Gatos, CA',
          __v: 0
        });
      });
  });

  it('gets all actors', async() => {
    const actors = await getActors();

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors.forEach(actor => {
          expect(res.body).toContainEqual({
            _id: actor._id,
            name: actor.name
          });
        });
      });
  });
});
