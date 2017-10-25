Super-Powered API Testing
============================

[![SuperTest](../../docs/supertest.png)](https://github.com/visionmedia/supertest)

SuperTest is an assertion library that uses [SuperAgent](https://visionmedia.github.io/superagent/) under the hood to do HTTP requests, and then lets you do assertions on the [HTTP response](https://visionmedia.github.io/superagent/#response-properties) using a really nice fluent syntax.

Here's an example:

```javascript
describe('add a trend', function() {
  it('should return the new trend', function() {
    return http.post('/trends')
      .send({"name": "Fixed-gear Bicycles", "from": 1950, "to": 1959})
      .expect(201)
      .expect('content-type', 'application/json')
      .expect(arrayOfTrends)                             // <-- custom assertion
      .expect([
        {"name": "Fixed-gear Bicycles", "from": 1950, "to": 1959}
      ]);
  });
});
```


Nice Feature: Dead-Simple API
--------------------------
Supertest's [assertion API](https://github.com/visionmedia/supertest#api) consists of a single method: `expect()` which is overloaded to accept several different arguments.  For example, in the sample code above, there are four assertions:

- `expect(404)` asserts that the response has an HTTP 404 status

- `expect('content-type', 'application/json')` asserts that the `Content-Type` header has the value "`application/json`"

- `expect([{"name": "Fixed-gear Bicycle", "from": 1950, "to": 1959}])` asserts that the parsed response body matches that JSON

- `expect(arrayOfTrends)` is really cool, because it's an example of SuperTest's extensibility.  You can pass any function you want, with whatever assertion logic you want.  If the function returns an error message (string) or throws an error, then the test fails


