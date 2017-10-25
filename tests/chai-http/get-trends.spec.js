var response;

describe('GET /trends', function() {
  describe('with no data', function() {
    before(function() {
      return http.get('/trends').then(function(res) { response = res; });
    });

    it('should return an HTTP 200', function() {
      response.should.have.status(200);
    });

    it('should return an empty array', function() {
      response.should.be.json;
      response.body.should.be.an('array').with.lengthOf(0);
    });
  });

  describe('with one trend', function() {
    before('Create test data', function() {
      return http.post('/trends').send({"name": "Crystal Pepsi", "from": 1992, "to": 1993});
    });

    before('fetch all trends', function() {
      return http.get('/trends').then(function(res) { response = res; });
    });

    it('should return an HTTP 200', function() {
      response.should.have.status(200);
    });

    it('should return one trend', function() {
      response.body.should.be.an.arrayOfTrends([
        { name: 'Crystal Pepsi', from: 1992, to: 1993 }
      ]);
    });

    after('delete the test data', function() {
      return http.delete('/trends/Crystal%20Pepsi')
    });
  });

  describe('with many trends', function() {
    before('create test data', function() {
      return Promise.all([
        http.post('/trends').send({"name": "MTV", "from": 1981, "to": 1995}),
        http.post('/trends').send({"name": "My Little Pony", "from": 1983, "to": 1992}),
        http.post('/trends').send({"name": "My Little Pony", "from": 2010, "to": 2014}),
        http.post('/trends').send({"name": "MySpace", "from": 2005, "to": 2008}),
      ]);
    });

    before('fetch all trends', function() {
      return http.get('/trends').then(function(res) { response = res; });
    });

    it('should return an HTTP 200', function() {
      response.should.have.status(200);
    });

    it('should return all trends', function() {
      response.body.should.be.an.arrayOfTrends([
        {"name": "MTV", "from": 1981, "to": 1995},
        {"name": "My Little Pony", "from": 1983, "to": 1992},
        {"name": "My Little Pony", "from": 2010, "to": 2014},
        {"name": "MySpace", "from": 2005, "to": 2008}
      ]);
    });

    after('delete the test data', function() {
      return Promise.all([
        http.delete('/trends/MTV'),
        http.delete('/trends/My%20Little%20Pony'),
        http.delete('/trends/MySpace'),
      ]);
    });
  });
});
