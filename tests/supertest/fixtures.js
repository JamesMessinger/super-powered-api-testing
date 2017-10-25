var supertest = require('supertest-as-promised');
var swagger = require('../../api/swagger.json');
var tv4 = require('tv4');

before(function() {
  console.log('\n' +
    ' _______  __   __  _______  _______  ______    _______  _______  _______  _______ \n' +
    '|       ||  | |  ||       ||       ||    _ |  |       ||       ||       ||       |\n' +
    '|  _____||  | |  ||    _  ||    ___||   | ||  |_     _||    ___||  _____||_     _|\n' +
    '| |_____ |  |_|  ||   |_| ||   |___ |   |_||_   |   |  |   |___ | |_____   |   |  \n' +
    '|_____  ||       ||    ___||    ___||    __  |  |   |  |    ___||_____  |  |   |  \n' +
    ' _____| ||       ||   |    |   |___ |   |  | |  |   |  |   |___  _____| |  |   |  \n' +
    '|_______||_______||___|    |_______||___|  |_|  |___|  |_______||_______|  |___|  \n'
  );
});

before('Define the base url', function() {
  // Create a SuperTest object with the base URL of our API.
  // This saves us from having to repeat this part of the URL for every request.
  http = supertest('http://localhost:8080/api');
});

// Defines custom assertions to validate responses against the Swagger spec
before('Custom assertions', function() {
  trend = function(response) {
    validateSchema(response.body, swagger.definitions.trend);
  };

  arrayOfTrends = function(response) {
    validateSchema(response.body, swagger.definitions.arrayOfTrends);
  };

  error = function(response) {
    validateSchema(response.body, swagger.definitions.error);
  };

  function validateSchema(json, schema) {
    var valid = tv4.validate(json, schema);
    if (!valid) {
      throw tv4.error;
    }
  }
});
