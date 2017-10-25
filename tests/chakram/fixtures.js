var chakram = require('chakram');
var swagger = require('../../api/swagger.json');
var expect = chakram.expect;

before(function() {
  console.log('\n' +
    ' _______  __   __  _______  ___   _  ______    _______  __   __ \n' +
    '|       ||  | |  ||   _   ||   | | ||    _ |  |   _   ||  |_|  |\n' +
    '|       ||  |_|  ||  |_|  ||   |_| ||   | ||  |  |_|  ||       |\n' +
    '|       ||       ||       ||      _||   |_||_ |       ||       |\n' +
    '|      _||       ||       ||     |_ |    __  ||       ||       |\n' +
    '|     |_ |   _   ||   _   ||    _  ||   |  | ||   _   || ||_|| |\n' +
    '|_______||__| |__||__| |__||___| |_||___|  |_||__| |__||_|   |_|\n'
  );
});

// Defines custom assertions to validate responses against the Swagger spec
before('Custom assertions', function() {
  chakram.addMethod('trend', function(response, trend) {
    expect(response).to.have.schema(swagger.definitions.trend);
    expect(response).to.have.json(trend);
  });

  chakram.addMethod('arrayOfTrends', function(response, trends) {
    expect(response).to.have.schema(swagger.definitions.arrayOfTrends);
    expect(response).to.have.json(function(json) {
      expect(json).to.be.an('array').with.lengthOf(trends.length);
      expect(json).to.have.deep.members(trends);
    });
  });

  chakram.addMethod('error', function(response, status, message) {
    expect(response).to.have.schema(swagger.definitions.error);
    expect(response).to.have.json('error', status);
    expect(response).to.have.json('message', message);
  });
});
