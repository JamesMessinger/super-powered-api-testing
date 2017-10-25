before(function() {
  console.log('\n' +
    ' _______  __   __  _______  ___          __   __  _______  _______  _______ \n' +
    '|       ||  | |  ||   _   ||   |        |  | |  ||       ||       ||       |\n' +
    '|       ||  |_|  ||  |_|  ||   |  ____  |  |_|  ||_     _||_     _||    _  |\n' +
    '|       ||       ||       ||   | |____| |       |  |   |    |   |  |   |_| |\n' +
    '|      _||       ||       ||   |        |       |  |   |    |   |  |    ___|\n' +
    '|     |_ |   _   ||   _   ||   |        |   _   |  |   |    |   |  |   |    \n' +
    '|_______||__| |__||__| |__||___|        |__| |__|  |___|    |___|  |___|    \n'
  );
});

before('Bootstrap', function() {
  // If we're running in Node, then we need to expose our dependencies as globals.
  // When running in a browser, these dependencies are already globals.
  if (typeof window === 'undefined') {
    global.tv4 = require('tv4');
    global.chai = require('chai');
    global.chaiHttp = require('chai-http');
    global.swagger = require('../../api/swagger.json');
  }

  chai.should();
  chai.use(chaiHttp);
  assert = chai.assert;
  expect = chai.expect;
});

before('Define the base url', function() {
  // Create a Chai HTTP object with the base URL of our API.
  // This saves us from having to repeat this part of the URL for every request.
  http = chai.request('http://localhost:8080/api');
});

before('Reset all data', function() {
  // When running in a web browser, the user can refresh the page at any time,
  // which can leave the server in an unknown state with leftover test data.
  // So this ensures that we start from a blank slate every time.
  return http.delete('/trends');
});

// Defines custom assertions to validate responses against the Swagger spec
before('Custom assertions', function() {
  chai.Assertion.addMethod('trend', function(trend) {
    var json = chai.util.flag(this, 'object');
    json.should.have.schema(swagger.definitions.trend);
    json.should.deep.equal(trend);
  });

  chai.Assertion.addMethod('arrayOfTrends', function(trends) {
    var json = chai.util.flag(this, 'object');
    json.should.have.schema(swagger.definitions.arrayOfTrends);
    json.should.be.an('array').with.lengthOf(trends.length);
    json.should.have.deep.members(trends);
  });

  chai.Assertion.addMethod('error', function(status, message) {
    var json = chai.util.flag(this, 'object');
    json.should.have.schema(swagger.definitions.error);
    json.error.should.equal(status);
    json.message.should.equal(message);
  });

  chai.Assertion.addMethod('schema', function(schema) {
    var json = chai.util.flag(this, 'object');
    var valid = tv4.validate(json, schema);
    if (!valid) {
      throw tv4.error;
    }
  });
});
