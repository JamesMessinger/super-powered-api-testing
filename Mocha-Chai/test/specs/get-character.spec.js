describe('GET /characters/{slug}', function () {

  it('should return the correct character', function () {
    let testData = [
      { name: 'Web Standards Woman', type: 'hero' },
      { name: 'The Incredible MVP', type: 'sidekick' },
      { name: 'The Feature Creep', type: 'villain' },
      { name: 'The Fantastic Four Spaces', type: 'hero' },
    ];

    return Promise.all(
      // Create all four characters
      testData.map(function (character) {
        return chai.request(API_ROOT)
          .post('/characters')
          .set('X-API-Key', API_KEY)
          .send(character);
      }))
      .then(function () {
        // Get The Incredible MVP
        return chai.request(API_ROOT)
          .get('/characters/theincrediblemvp')
          .set('X-API-Key', API_KEY);
      })
      .then(function (response) {
        // The response should be The Incredible MVP
        response.should.be.successful(200);
        response.body.should.be.a.character({
          name: 'The Incredible MVP',
          type: 'sidekick',
          links: {
            self: API_ROOT + '/characters/theincrediblemvp',
          }
        });
      });
  });

  it('should return links to the character\'s sidekick and villain', function () {
    let testData = [
      {
        name: 'Web Standards Woman',
        nemesis: {
          name: 'IE 6',
        }
      },
      {
        name: 'Startup Man',
        sidekick: {
          name: 'The Incredible MVP',
        },
        nemesis: {
          name: 'Professor Capital',
        },
      },
    ];

    return Promise.all(
      // Create the two heroes, two nemesis, and one sidekick
      testData.map(function (character) {
        return chai.request(API_ROOT)
          .post('/characters')
          .set('X-API-Key', API_KEY)
          .send(character);
      }))
      .then(function () {
        // Get Startup Man
        return chai.request(API_ROOT)
          .get('/characters/startupman')
          .set('X-API-Key', API_KEY);
      })
      .then(function (response) {
        // The response should contain links to the sidekick and nemesis
        response.should.be.successful(200);
        response.body.should.be.a.character({
          name: 'Startup Man',
          type: 'hero',
          links: {
            self: API_ROOT + '/characters/startupman',
            sidekick: API_ROOT + '/characters/theincrediblemvp',
            nemesis: API_ROOT + '/characters/professorcapital',
          }
        });
      });
  });

  it('should return a 404 if the character doesn\'t exist', function () {
    return chai.request(API_ROOT)
      .get('/characters/supercoder')
      .set('X-API-Key', API_KEY)
      .then(function (response) {
        throw new Error('Expected a 404 response, but got a ' + response.status);
      })
      .catch(function (error) {
        error.response.should.be.an.error(404);
        error.response.body.error.should.equal('NOT_FOUND');
        error.response.body.message.should.equal('Character "supercoder" does not exist');
      });
  });

});
