/**
 * Deletes all characters before each test, so that each test starts-off with no data
 */
beforeEach('Delete all characters', function () {
  return chai.request(API_ROOT)
    .delete('/characters')
    .set('X-API-Key', API_KEY)
    .then(function (response) {
      response.should.have.status(200);
    });
});
