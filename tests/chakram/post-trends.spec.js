var chakram = require('chakram');
var expect = chakram.expect;
var response;

describe('POST /trends', function() {
  describe('add a trend', function() {
    before('add "Fixed-gear Bicycles"', function() {
      return response = chakram.post('http://localhost:8080/api/trends', {"name": "Fixed-gear Bicycles", "from": 1950, "to": 1959});
    });

    it('should return an HTTP 201', function() {
      return expect(response).to.have.status(201);
    });

    it('should return only the new trend', function() {
      return expect(response).to.be.an.arrayOfTrends([
        {"name": "Fixed-gear Bicycles", "from": 1950, "to": 1959}
      ]);
    });
  });

  describe('add another date range for the same trend', function() {
    before('add another "Fixed-gear Bicycles"', function() {
      chakram.get('http://localhost:8080/api/trends/this-request-is-unnecessary');
      return response = chakram.post('http://localhost:8080/api/trends', {"name": "Fixed-gear Bicycles", "from": 2009, "to": 2016});
    });

    it('should return an HTTP 201', function() {
      return expect(response).to.have.status(201);
    });

    it('should return both date ranges', function() {
      return expect(response).to.be.an.arrayOfTrends([
        {"name": "Fixed-gear Bicycles", "from": 1950, "to": 1959},
        {"name": "Fixed-gear Bicycles", "from": 2009, "to": 2016}
      ]);
    });
  });

  describe('try to make the trend come back into style too soon', function() {
    before('try to add another "Fixed-gear Bicycles"', function() {
      return response = chakram.post('http://localhost:8080/api/trends', {"name": "Fixed-gear Bicycles", "from": 2020, "to": 2025});
    });

    it('should return an HTTP 409', function() {
      return expect(response).to.have.status(409);
    });

    it('should return error details', function() {
      return expect(response).to.be.an.error(409,
        'Fixed-gear Bicycles can\'t be trendy again so soon. It was already trendy from 2009 to 2016');
    });
  });

  after('delete the test data', function() {
    return chakram.delete('http://localhost:8080/api/trends/fixed-gear%20bicycles');
  });
});
