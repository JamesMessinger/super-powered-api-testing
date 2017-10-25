describe('POST /trends', function() {
  describe('add a trend', function() {
    it('should return the new trend', function() {
      return http.post('/trends')
        .send({"name": "Fixed-gear Bicycles", "from": 1950, "to": 1959})
        .expect(201)
        .expect(arrayOfTrends)
        .expect([
          {"name": "Fixed-gear Bicycles", "from": 1950, "to": 1959}
        ]);
    });
  });

  describe('add another date range for the same trend', function() {
    it('should return all date ranges for the added trend', function() {
      return http.post('/trends')
        .send({"name": "Fixed-gear Bicycles", "from": 2009, "to": 2016})
        .expect(201)
        .expect(arrayOfTrends)
        .expect([
          {"name": "Fixed-gear Bicycles", "from": 1950, "to": 1959},
          {"name": "Fixed-gear Bicycles", "from": 2009, "to": 2016}
        ]);
    });
  });

  describe('try to make the trend come back into style too soon', function() {
    it('should return an error if the trend conflicts with an existing date', function() {
      return http.post('/trends')
        .send({"name": "Fixed-gear Bicycles", "from": 2020, "to": 2025})
        .expect(409)
        .expect(error)
        .expect({
          error: 409,
          message: 'Fixed-gear Bicycles can\'t be trendy again so soon. It was already trendy from 2009 to 2016'
        });
    });
  });

  after('delete the test data', function() {
    return http.delete('/trends/fixed-gear%20bicycles');
  });
});
