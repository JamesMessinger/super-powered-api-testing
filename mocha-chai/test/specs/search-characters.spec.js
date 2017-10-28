describe('GET /characters (with query params)', function () {

  it('should return an empty array when there are no characters', function () {
    // Get all characters
    return chai.request(API_ROOT)
      .get('/characters?type=villain&name=spiderman')
      .set('X-API-Key', API_KEY)
      .then(function (response) {
        // The response should be an empty array
        response.should.be.successful(200);
        response.body.should.be.an('array').with.lengthOf(0);
      });
  });

  it('should find characters by type', function () {
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
        // Search for the two heroes
        return chai.request(API_ROOT)
          .get('/characters?type=hero')
          .set('X-API-Key', API_KEY);
      })
      .then(function (response) {
        // The response should only have the two heroes
        response.should.be.successful(200);
        response.body.should.be.an('array').with.lengthOf(2);

        // The characters should be sorted by name
        var fantasticFourSpaces = response.body[0];
        var webStandardsWoman = response.body[1];

        fantasticFourSpaces.should.be.a.character({
          name: 'The Fantastic Four Spaces',
          type: 'hero',
          links: {
            self: API_ROOT + '/characters/thefantasticfourspaces',
          }
        });

        webStandardsWoman.should.be.a.character({
          name: 'Web Standards Woman',
          type: 'hero',
          links: {
            self: API_ROOT + '/characters/webstandardswoman',
          }
        });
      });
  });

  it('should find characters by name', function () {
    let testData = [
      { name: 'Web Standards Woman' },
      { name: 'The Project Manager' },
      { name: 'The Incredible MVP' },
      { name: 'Testing Man' },
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
        // Search for the three with "man" in the name
        return chai.request(API_ROOT)
          .get('/characters?name=mAn')
          .set('X-API-Key', API_KEY);
      })
      .then(function (response) {
        // The response should contain the three matches
        response.should.be.successful(200);
        response.body.should.be.an('array').with.lengthOf(3);

        // The characters should be sorted by name
        var testingMan = response.body[0];
        var projectManager = response.body[1];
        var webStandardsWoman = response.body[2];

        testingMan.should.be.a.character({
          name: 'Testing Man',
          type: 'hero',
          links: {
            self: API_ROOT + '/characters/testingman',
          }
        });

        projectManager.should.be.a.character({
          name: 'The Project Manager',
          type: 'hero',
          links: {
            self: API_ROOT + '/characters/theprojectmanager',
          }
        });

        webStandardsWoman.should.be.a.character({
          name: 'Web Standards Woman',
          type: 'hero',
          links: {
            self: API_ROOT + '/characters/webstandardswoman',
          }
        });
      });
  });

  it('should find characters by name and type', function () {
    let testData = [
      { name: 'Web Standards Woman', type: 'hero' },
      { name: 'The Project Manager', type: 'sidekick' },
      { name: 'The Incredible MVP', type: 'sidekick' },
      { name: 'Testing Man', type: 'hero' },
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
        // Search for The Project Manager
        return chai.request(API_ROOT)
          .get('/characters?name=man&type=sidekick')
          .set('X-API-Key', API_KEY);
      })
      .then(function (response) {
        // The response should only contain The Project Manager
        response.should.be.successful(200);
        response.body.should.be.an('array').with.lengthOf(1);

        var projectManager = response.body[0];
        projectManager.should.be.a.character({
          name: 'The Project Manager',
          type: 'sidekick',
          links: {
            self: API_ROOT + '/characters/theprojectmanager',
          }
        });
      });
  });

});
