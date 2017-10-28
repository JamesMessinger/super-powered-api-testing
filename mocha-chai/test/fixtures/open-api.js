/**
 * Downloads the OpenAPI definition, so we can use it for tests
 */
before('Download OpenAPI definition', function () {
  return chai.request(API_ROOT)
    .get('/schema')
    .then(function (response) {
      response.should.have.status(200);

      host.global.openAPI = response.body;
    });
});
