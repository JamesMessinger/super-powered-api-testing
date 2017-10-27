describe('POST /characters', function () {

  it('should create a single character', function () {
    return Promise.resolve()
      .then(function () {
        // Create a character
        return chai.request(API_ROOT)
          .post('/characters')
          .set('X-API-Key', API_KEY)
          .send({ name: 'Super Coder', powers: ['10x-ing']});
      })
      .then(function (response) {
        // The response should be Super Coder
        response.should.be.successful(201);
        response.body.should.be.a.character({
          name: 'Super Coder',
          type: 'hero',
          powers: ['10x-ing'],
          links: {
            self: API_ROOT + '/characters/supercoder',
          }
        });
      });
  });

  it('should create a hero, sidekick, and villain', function () {
    return Promise.resolve()
      .then(function () {
        // Create the a hero with a sidekick and nemesis
        return chai.request(API_ROOT)
          .post('/characters')
          .set('X-API-Key', API_KEY)
          .send({
            name: 'Startup Man',
            sidekick: {
              name: 'The Incredible MVP',
            },
            nemesis: {
              name: 'Professor Capital',
            },
          });
      })
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
        var professorCapital = response.body[0];
        var startupMan = response.body[1];
        var incredibleMVP = response.body[2];

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
