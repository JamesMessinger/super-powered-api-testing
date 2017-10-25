var chakram = require('chakram');
var expect = chakram.expect;
var response;

describe('GET /trends', function() {
  describe('with no data', function() {
    before(function() {
      return response = chakram.get('http://localhost:8080/api/trends');
    });

    it('should return an HTTP 200', function() {
      return expect(response).to.have.status(200);
    });

    it('should return an empty array', function() {
      return expect(response).to.have.json(function(json) {
        expect(json).to.be.an('array').with.lengthOf(0);
      });
    });
  });

  describe('with one trend', function() {
    before('create test data', function() {
      return chakram.post('http://localhost:8080/api/trends', {"name": "Crystal Pepsi", "from": 1992, "to": 1993});
    });

    before('fetch ALL trends', function() {
      return response = chakram.get('http://localhost:8080/api/trends');
    });

    it('should return an HTTP 200', function() {
      return expect(response).to.have.status(200);
    });

    it('should return one trend', function() {
      return expect(response).to.be.an.arrayOfTrends([
        { name: 'Crystal Pepsi', from: 1992, to: 1993 }
      ]);
    });

    after('delete the test data', function() {
      return chakram.delete('http://localhost:8080/api/trends/Crystal%20Pepsi');
    });
  });

  describe('with many trends', function() {
    before('create test data', function() {
      chakram.post('http://localhost:8080/api/trends', {"name": "MTV", "from": 1981, "to": 1995});
      chakram.post('http://localhost:8080/api/trends', {"name": "My Little Pony", "from": 1983, "to": 1992});
      chakram.post('http://localhost:8080/api/trends', {"name": "My Little Pony", "from": 2010, "to": 2014});
      return chakram.post('http://localhost:8080/api/trends', {"name": "MySpace", "from": 2005, "to": 2008});
    });

    before('fetch ALL trends', function() {
      return response = chakram.get('http://localhost:8080/api/trends');
    });

    it('should return an HTTP 200', function() {
      return expect(response).to.have.status(200);
    });

    it('should return all trends', function() {
      return expect(response).to.be.an.arrayOfTrends([
        {"name": "MTV", "from": 1981, "to": 1995},
        {"name": "My Little Pony", "from": 1983, "to": 1992},
        {"name": "My Little Pony", "from": 2010, "to": 2014},
        {"name": "MySpace", "from": 2005, "to": 2008}
      ]);
    });

    after('delete the test data', function() {
      chakram.delete('http://localhost:8080/api/trends/MTV');
      chakram.delete('http://localhost:8080/api/trends/My%20Little%20Pony');
      return chakram.delete('http://localhost:8080/api/trends/MySpace');
    });
  });
});
