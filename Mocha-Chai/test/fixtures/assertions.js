/**
 * Defines custom Chai.js assertions
 */
before('Custom assertions', function () {

  // Asserts that an API response is a successful response
  chai.Assertion.addMethod('successful', function (status) {
    var response = chai.util.flag(this, 'object');

    expect(response).to.be.an('object');
    expect(response.status).to.be.a('number').at.least(200).and.below(400);
    response.should.be.json;
    response.should.have.status(status);
  });

  // Asserts that an API response is an error response
  chai.Assertion.addMethod('error', function (status) {
    var response = chai.util.flag(this, 'object');

    expect(response).to.be.an('object');
    expect(response.status).to.be.a('number').at.least(400).and.below(600);
    response.should.be.json;
    response.should.have.status(status);

    // Validate the response body against the OpenAPI schema
    response.body.should.have.jsonSchema(host.global.openAPI.components.schemas.ErrorResponse);
  });

  // Asserts that a character is valid
  chai.Assertion.addMethod('character', function (expected) {
    var character = chai.util.flag(this, 'object');

    // Validate the character against the OpenAPI schema
    character.should.have.jsonSchema(host.global.openAPI.components.schemas.CharacterResponse);

    // The HATEOAS links should all be relative to the API_ROOT
    Object.keys(character.links).forEach(function (key) {
      var link = character.links[key];
      link.substr(0, API_ROOT.length).should.equal(API_ROOT);
      link.substr(API_ROOT.length).should.match(/^\/characters\/[a-z0-9]+$/);
    });

    Object.keys(expected).forEach(function (key) {
      var actualValue = character[key];
      var expectedValue = expected[key];
      actualValue.should.deep.equal(expectedValue);
    });
  });

});
