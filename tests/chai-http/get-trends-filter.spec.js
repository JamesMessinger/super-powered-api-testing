var response;

describe('GET /trends/{filter}', function() {
  before('create test data', function() {
    return Promise.all([
      http.post('/trends').send({"name": "Pokemon", "from": 1996, "to": 2005}),
      http.post('/trends').send({"name": "Puka Shell Necklaces", "from": 1969, "to": 1974}),
      http.post('/trends').send({"name": "Puka Shell Necklaces", "from": 1993, "to": 1998}),
      http.post('/trends').send({"name": "Tamogatchi", "from": 1996, "to": 1999}),
      http.post('/trends').send({"name": "Vanilla Ice", "from": 1990, "to": 1993}),
      http.post('/trends').send({"name": "Furbies", "from": 1998, "to": 2002}),
    ]);
  });

  describe('filter by year', function() {
    before('fetch all trends for 1997', function() {
      return http.get('/trends/1997').then(function(res) { response = res; });
    });

    it('should return an HTTP 200', function() {
      response.should.have.status(200);
    });

    it('should return trends for 1997', function() {
      response.body.should.be.an.arrayOfTrends([
        {"name": "Pokemon", "from": 1996, "to": 2005},
        {"name": "Puka Shell Necklaces", "from": 1993, "to": 1998},
        {"name": "Tamogatchi", "from": 1996, "to": 1999}
      ]);
    });
  });

  describe('filter by name', function() {
    before('fetch all trends for "Puka Shell Necklaces"', function() {
      return http.get('/trends/puka%20shell%20necklaces').then(function(res) { response = res; });
    });

    it('should return an HTTP 200', function() {
      response.should.have.status(200);
    });

    it('should return trends for "Puka Shell Necklaces"', function() {
      response.body.should.be.an.arrayOfTrends([
        {"name": "Puka Shell Necklaces", "from": 1969, "to": 1974},
        {"name": "Puka Shell Necklaces", "from": 1993, "to": 1998},
      ]);
    });
  });

  describe('a year with no trends', function() {
    before('fetch all trends for 1989', function() {
      return http.get('/trends/1989').catch(function(err) { response = err.response; });
    });

    it('should return an HTTP 404', function() {
      response.should.have.status(404);
    });

    it('should return error details', function() {
      response.body.should.be.an.error(404, '1989 isn\'t a trendy year');
    });
  });

  describe('a trend that doesn\'t exist', function() {
    before('fetch all trends for "Mullets"', function() {
      return http.get('/trends/Mullets').catch(function(err) { response = err.response; });
    });

    it('should return an HTTP 404', function() {
      response.should.have.status(404);
    });

    it('should return error details', function() {
      response.body.should.be.an.error(404, 'Mullets aren\'t trendy');
    });
  });

  after('delete the test data', function() {
    return Promise.all([
      http.delete('/trends/Pokemon'),
      http.delete('/trends/Puka%20Shell%20Necklaces'),
      http.delete('/trends/Tamogatchi'),
      http.delete('/trends/Vanilla%20Ice'),
      http.delete('/trends/Furbies'),
    ]);
  });
});
