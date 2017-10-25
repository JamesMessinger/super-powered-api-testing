var response;

describe('POST /trends', function() {
  describe('add a trend', function() {
    before('add "Fixed-gear Bicycles"', function() {
      return http
        .post('/trends')
        .send({"name": "Fixed-gear Bicycles", "from": 1950, "to": 1959})
        .then(function(res) { response = res; });
    });

    it('should return an HTTP 201', function() {
      response.should.have.status(201);
    });

    it('should return only the new trend', function() {
      response.body.should.be.an.arrayOfTrends([
        {"name": "Fixed-gear Bicycles", "from": 1950, "to": 1959}
      ]);
    });
  });

  describe('add another date range for the same trend', function() {
    before('add another "Fixed-gear Bicycles"', function() {
      return http
        .post('/trends')
        .send({"name": "Fixed-gear Bicycles", "from": 2009, "to": 2016})
        .then(function(res) { response = res; });
    });

    it('should return an HTTP 201', function() {
      response.should.have.status(201);
    });

    it('should return both date ranges', function() {
      response.body.should.be.an.arrayOfTrends([
        {"name": "Fixed-gear Bicycles", "from": 1950, "to": 1959},
        {"name": "Fixed-gear Bicycles", "from": 2009, "to": 2016}
      ]);
    });
  });

  describe('try to make the trend come back into style too soon', function() {
    before('try to add another "Fixed-gear Bicycles"', function() {
      return http
        .post('/trends')
        .send({"name": "Fixed-gear Bicycles", "from": 2020, "to": 2025})
        .catch(function(err) { response = err.response; });
    });

    it('should return an HTTP 409', function() {
      response.should.have.status(409);
    });

    it('should return error details', function() {
      response.body.should.be.an.error(409,
        'Fixed-gear Bicycles can\'t be trendy again so soon. It was already trendy from 2009 to 2016');
    });
  });

  after('delete the test data', function() {
    return http.delete('/trends/fixed-gear%20bicycles');
  });
});
