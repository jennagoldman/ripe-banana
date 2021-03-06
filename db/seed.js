const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Film = require('../lib/models/Film');
const Reviewer = require('../lib/models/Reviewer');
const Review = require('../lib/models/Review');
const chance = require('chance').Chance();
const moviesNames = require('movies-names');

module.exports = async({ 
  studiosToCreate = 10,
  actorsToCreate = 50,
  filmsToCreate = 100,
  reviewersToCreate = 20,
  reviewsToCreate = 500
} = {}) => {
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

  const films = await Film.create([...Array(filmsToCreate)].map(() => ({
    title: moviesNames.random().title,
    released: chance.year({ min: 1950, max: 2020 }),
    studio: chance.pickone(studios)._id,
    cast: [
      { role: chance.name(), actor: chance.pickone(actors)._id }
    ]
  })));

  const reviewers = await Reviewer.create([...Array(reviewersToCreate)].map(() => ({
    name: chance.name(),
    company: chance.animal()
  })));

  const reviews = await Review.create([...Array(reviewsToCreate)].map(() => ({
    rating: chance.integer({ min: 1, max: 5 }),
    reviewer: chance.pickone(reviewers)._id,
    review: chance.paragraph({ sentences: 1 }),
    film: chance.pickone(films)._id
  })));
};
