const Studio = require('../lib/models/Studio');
const chance = require('chance').Chance();

module.exports = async({ studiosToCreate = 10 } = {}) => {
  const studios = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.name(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: 'United States'
    }
  })));
};
