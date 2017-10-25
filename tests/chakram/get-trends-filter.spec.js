var chakram = require('chakram');
var expect = chakram.expect;
var response;

describe('GET /trends/{filter}', function() {
  before('create test data', function() {
    chakram.post('http://localhost:8080/api/trends', {"name": "Pokemon", "from": 1996, "to": 2005});
    chakram.post('http://localhost:8080/api/trends', {"name": "Puka Shell Necklaces", "from": 1969, "to": 1974});
    chakram.post('http://localhost:8080/api/trends', {"name": "Puka Shell Necklaces", "from": 1993, "to": 1998});
    chakram.post('http://localhost:8080/api/trends', {"name": "Tamogatchi", "from": 1996, "to": 1999});
    chakram.post('http://localhost:8080/api/trends', {"name": "Vanilla Ice", "from": 1990, "to": 1993});
    return chakram.post('http://localhost:8080/api/trends', {"name": "Furbies", "from": 1998, "to": 2002});
  });

  describe('filter by year', function() {
    before('fetch all trends for 1997', function() {
      return response = chakram.get('http://localhost:8080/api/trends/1997');
    });

    it('should return an HTTP 200', function() {
      return expect(response).to.have.status(200);
    });

    it('should return trends for 1997', function() {
      return expect(response).to.be.an.arrayOfTrends([
        {"name": "Pokemon", "from": 1996, "to": 2005},
        {"name": "Puka Shell Necklaces", "from": 1993, "to": 1998},
        {"name": "Tamogatchi", "from": 1996, "to": 1999}
      ]);
    });
  });

  describe('filter by name', function() {
    before('fetch all trends for "Puka Shell Necklaces"', function() {
      return response = chakram.get('http://localhost:8080/api/trends/puka%20shell%20necklaces');
    });

    it('should return an HTTP 200', function() {
      return expect(response).to.have.status(200);
    });

    it('should return trends for "Puka Shell Necklaces"', function() {
      return expect(response).to.be.an.arrayOfTrends([
        {"name": "Puka Shell Necklaces", "from": 1969, "to": 1974},
        {"name": "Puka Shell Necklaces", "from": 1993, "to": 1998},
      ]);
    });
  });

  describe('a year with no trends', function() {
    before('fetch all trends for 1989', function() {
      return response = chakram.get('http://localhost:8080/api/trends/1989');
    });

    it('should return an HTTP 404', function() {
      return expect(response).to.have.status(404);
    });

    it('should return error details', function() {
      return expect(response).to.be.an.error(404, '1989 isn\'t a trendy year');
    });
  });

  describe('a trend that doesn\'t exist', function() {
    before('fetch all trends for "Mullets"', function() {
      return response = chakram.get('http://localhost:8080/api/trends/Mullets');
    });

    it('should return an HTTP 404', function() {
      return expect(response).to.have.status(404);
    });

    it('should return error details', function() {
      return expect(response).to.be.an.error(404, 'Mullets aren\'t trendy');
    });
  });

  after('delete the test data', function() {
    chakram.delete('http://localhost:8080/api/trends/Pokemon');
    chakram.delete('http://localhost:8080/api/trends/Puka%20Shell%20Necklaces');
    chakram.delete('http://localhost:8080/api/trends/Tamogatchi');
    chakram.delete('http://localhost:8080/api/trends/Vanilla%20Ice');
    return chakram.delete('http://localhost:8080/api/trends/Furbies');
  });
});
