describe('PUT /characters/{slug}', function () {

  it('should update the character\'s properties', function () {
    return Promise.resolve()
      .then(function () {
        // Create a character
        return chai.request(API_ROOT)
          .post('/characters')
          .set('X-API-Key', API_KEY)
          .send({ name: 'Super Coder', powers: ['10-xing']});
      })
      .then(function () {
        // Update the character
        return chai.request(API_ROOT)
          .put('/characters/supercoder')
          .set('X-API-Key', API_KEY)
          .send({ name: 'Super Coder', type: 'hero', powers: ['Caffeine'], weakness: 'Imposter syndrome' });
      })
      .then(function (response) {
        // The response should have the updated fields
        response.should.be.successful(200);
        response.body.should.be.a.character({
          name: 'Super Coder',
          type: 'hero',
          powers: ['Caffeine'],
          weakness: 'Imposter syndrome',
          links: {
            self: API_ROOT + '/characters/supercoder',
          }
        });
      });
  });

  it('should clear any properties that aren\'t updated', function () {
    return Promise.resolve()
      .then(function () {
        // Create a character
        return chai.request(API_ROOT)
          .post('/characters')
          .set('X-API-Key', API_KEY)
          .send({ name: 'Super Coder', powers: ['10-xing']});
      })
      .then(function () {
        // Update the character
        return chai.request(API_ROOT)
          .put('/characters/supercoder')
          .set('X-API-Key', API_KEY)
          .send({ name: 'Super Coder', type: 'hero', weakness: 'Imposter syndrome' });
      })
      .then(function (response) {
        // The response should no longer have any powers
        response.should.be.successful(200);
        response.body.should.be.a.character({
          name: 'Super Coder',
          type: 'hero',
          powers: [],
          weakness: 'Imposter syndrome',
          links: {
            self: API_ROOT + '/characters/supercoder',
          }
        });
      });
  });

  it('should change the character\'s sidekick and nemesis', function () {
    let testData = [
      {
        name: 'Web Standards Woman',
        sidekick: {
          name: 'W3C',
        },
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
      // Create the two heroes, two nemesis, and two sidekicks
      testData.map(function (character) {
        return chai.request(API_ROOT)
          .post('/characters')
          .set('X-API-Key', API_KEY)
          .send(character);
      }))
      .then(function () {
        // Update Startup Man's sidekick and nemesis
        return chai.request(API_ROOT)
          .put('/characters/startupman')
          .set('X-API-Key', API_KEY)
          .send({
            name: 'Startup Man',
            type: 'hero',
            sidekick: API_ROOT + '/characters/w3c',
            nemesis: API_ROOT + '/characters/ie6'
          });
      })
      .then(function (response) {
        // The response should have the updated sidekick and nemesis
        response.should.be.successful(200);
        response.body.should.be.a.character({
          name: 'Startup Man',
          type: 'hero',
          links: {
            self: API_ROOT + '/characters/startupman',
            sidekick: API_ROOT + '/characters/w3c',
            nemesis: API_ROOT + '/characters/ie6',
          }
        });
      });
  });

  it('should not allow setting sidekick or nemesis to characters with the wrong type', function () {
    let testData = [
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
      // Create the a hero, a nemesis, and a sidekick
      testData.map(function (character) {
        return chai.request(API_ROOT)
          .post('/characters')
          .set('X-API-Key', API_KEY)
          .send(character);
      }))
      .then(function () {
        // Try to swap Startup Man's sidekick and nemesis
        return chai.request(API_ROOT)
          .put('/characters/startupman')
          .set('X-API-Key', API_KEY)
          .send({
            name: 'Startup Man',
            type: 'hero',
            sidekick: API_ROOT + '/characters/professorcapital',
            nemesis: API_ROOT + '/characters/theincrediblemvp'
          });
      })
      .catch(function (error) {
        error.response.should.be.an.error(400);
        error.response.body.error.should.equal('BAD_REQUEST');
        error.response.body.message.should.equal('The "sidekick.type" value must be "sidekick"');
      });
  });

  it('should not allow setting sidekick or nemesis to characters that don\'t exist', function () {
    return Promise.resolve()
      .then(function () {
        // Create a character
        return chai.request(API_ROOT)
          .post('/characters')
          .set('X-API-Key', API_KEY)
          .send({ name: 'Super Coder' });
      })
      .then(function () {
        // Try to set the sidekick and nemesis to characters that don't exist
        return chai.request(API_ROOT)
          .put('/characters/supercoder')
          .set('X-API-Key', API_KEY)
          .send({
            name: 'Super Coder',
            type: 'hero',
            sidekick: API_ROOT + '/characters/notarealcharacter',
            nemesis: API_ROOT + '/characters/notarealcharacter',
          });
      })
      .catch(function (error) {
        error.response.should.be.an.error(404);
        error.response.body.error.should.equal('NOT_FOUND');
        error.response.body.message.should.equal('Character "notarealcharacter" does not exist');
      });
  });

  it('should change the character\'s URL if its name changes', function () {
    return Promise.resolve()
      .then(function () {
        // Create a character
        return chai.request(API_ROOT)
          .post('/characters')
          .set('X-API-Key', API_KEY)
          .send({ name: 'Super Coder', type: 'hero' });
      })
      .then(function () {
        // Rename the character
        return chai.request(API_ROOT)
          .put('/characters/supercoder')
          .set('X-API-Key', API_KEY)
          .send({ name: 'Super Duper Coder', type: 'hero' });
      })
      .then(function (response) {
        // The response should be Super Duper Coder
        response.should.be.successful(200);
        response.body.should.be.a.character({
          name: 'Super Duper Coder',
          type: 'hero',
          links: {
            self: API_ROOT + '/characters/superdupercoder',
          }
        });
      })
      .then(function () {
        // We should get a 404 if we attempt to fetch the old name
        return chai.request(API_ROOT)
          .get('/characters/supercoder')
          .set('X-API-Key', API_KEY);
      })
      .catch(function (error) {
        if (!error.response) { throw error; }

        error.response.should.be.an.error(404);
        error.response.body.error.should.equal('NOT_FOUND');
        error.response.body.message.should.equal('Character "supercoder" does not exist');
      })
      .then(function () {
        // We should be able to fetch the new name
        return chai.request(API_ROOT)
          .get('/characters/superdupercoder')
          .set('X-API-Key', API_KEY);
      })
      .then(function (response) {
        // The response should be Super Duper Coder
        response.should.be.successful(200);
        response.body.should.be.a.character({
          name: 'Super Duper Coder',
          type: 'hero',
          links: {
            self: API_ROOT + '/characters/superdupercoder',
          }
        });
      });
  });

});
