const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const chance = require('chance').Chance();

module.exports = async({ studiosToCreate = 10, actorsToCreate = 50 } = {}) => {
  const studioNames = ['Sony Pictures', 'Warner Bros', '20th Century Fox', 'Lions Gate', 'Dreamworks', 'LucasArts', 'Walt Disney Studios', 'New Line Cinema', 'Paramount Pictures', 'Universal Pictures'];
  
  const studios = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.pickone(studioNames),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: 'United States'
    }
  })));

  const actors = await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: chance.name(),
    dob: chance.date(),
    pob: `${chance.city()}, ${chance.state()}`
  })));
};
