describe('GET /characters', function () {

  it('should return an empty array when there are no characters', function () {
    // Get all characters
    return chai.request(API_ROOT)
      .get('/characters')
      .set('X-API-Key', API_KEY)
      .then(function (response) {
        // The response should be an empty array
        response.should.be.successful(200);
        response.body.should.be.an('array').with.lengthOf(0);
      });
  });

  it('should return a single character', function () {
    return Promise.resolve()
      .then(function () {
        // Create a character
        return chai.request(API_ROOT)
          .post('/characters')
          .set('X-API-Key', API_KEY)
          .send({ name: 'Super Coder', powers: ['10x-ing']});
      })
      .then(function () {
        // Fetch all characters
        return chai.request(API_ROOT)
          .get('/characters')
          .set('X-API-Key', API_KEY);
      })
      .then(function (response) {
        // The response should only have Super Coder
        response.should.be.successful(200);
        response.body.should.be.an('array').with.lengthOf(1);

        var superCoder = response.body[0];
        superCoder.should.be.a.character({
          name: 'Super Coder',
          type: 'hero',
          powers: ['10x-ing'],
          links: {
            self: API_ROOT + '/characters/supercoder',
          }
        });
      });
  });

  it('should return multiple characters', function () {
    let testData = [
      { name: 'Web Standards Woman', powers: ['backward-compatibility']},
      { name: 'The Fantastic Four Spaces', powers: ['being objectively better than tabs']},
      { name: 'The Incredible MVP', powers: ['non-viability', 'justification']},
    ];

    return Promise.all(
      // Create all three characters
      testData.map(function (character) {
        return chai.request(API_ROOT)
          .post('/characters')
          .set('X-API-Key', API_KEY)
          .send(character);
      }))
      .then(function () {
        // Fetch all characters
        return chai.request(API_ROOT)
          .get('/characters')
          .set('X-API-Key', API_KEY);
      })
      .then(function (response) {
        // The response should contain all three characters
        response.should.be.successful(200);
        response.body.should.be.an('array').with.lengthOf(3);

        // The characters should be sorted by name
        var fantasticFourSpaces = response.body[0];
        var incredibleMVP = response.body[1];
        var webStandardsWoman = response.body[2];

        fantasticFourSpaces.should.be.a.character({
          name: 'The Fantastic Four Spaces',
          type: 'hero',
          powers: ['being objectively better than tabs'],
          links: {
            self: API_ROOT + '/characters/thefantasticfourspaces',
          }
        });

        incredibleMVP.should.be.a.character({
          name: 'The Incredible MVP',
          type: 'hero',
          powers: ['non-viability', 'justification'],
          links: {
            self: API_ROOT + '/characters/theincrediblemvp',
          }
        });

        webStandardsWoman.should.be.a.character({
          name: 'Web Standards Woman',
          type: 'hero',
          powers: ['backward-compatibility'],
          links: {
            self: API_ROOT + '/characters/webstandardswoman',
          }
        });
      });
  });

  it('should return heroes, sidekicks, and villains', function () {
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
        // Fetch all characters
        return chai.request(API_ROOT)
          .get('/characters')
          .set('X-API-Key', API_KEY);
      })
      .then(function (response) {
        // The response should contain all five characters
        response.should.be.successful(200);
        response.body.should.be.an('array').with.lengthOf(5);

        // The characters should be sorted by name
        var ie6 = response.body[0];
        var professorCapital = response.body[1];
        var startupMan = response.body[2];
        var incredibleMVP = response.body[3];
        var webStandardsWoman = response.body[4];

        webStandardsWoman.should.be.a.character({
          name: 'Web Standards Woman',
          type: 'hero',
          links: {
            self: API_ROOT + '/characters/webstandardswoman',
            nemesis: API_ROOT + '/characters/ie6',
          }
        });

        ie6.should.be.a.character({
          name: 'IE 6',
          type: 'villain',
          links: {
            self: API_ROOT + '/characters/ie6',
          }
        });

        startupMan.should.be.a.character({
          name: 'Startup Man',
          type: 'hero',
          links: {
            self: API_ROOT + '/characters/startupman',
            sidekick: API_ROOT + '/characters/theincrediblemvp',
            nemesis: API_ROOT + '/characters/professorcapital',
          }
        });

        incredibleMVP.should.be.a.character({
          name: 'The Incredible MVP',
          type: 'sidekick',
          links: {
            self: API_ROOT + '/characters/theincrediblemvp',
          }
        });

        professorCapital.should.be.a.character({
          name: 'Professor Capital',
          type: 'villain',
          links: {
            self: API_ROOT + '/characters/professorcapital',
          }
        });

      });
  });

});
