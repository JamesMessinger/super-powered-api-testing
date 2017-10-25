Super-Powered API Testing
============================

[![Chakram](../../docs/chakram.png)](https://dareid.github.io/chakram/)

Chakram is an assertion library that uses [Request](https://github.com/request/request) under the hood to do HTTP requests, and then lets you do assertions on the [HTTP response](https://dareid.github.io/chakram/jsdoc/global.html#ChakramResponse) using a really nice fluent syntax.

Here's an example:

```javascript
var response;

describe('add a trend', function() {
  before('add "Fixed-gear Bicycles"', function() {
    return response = chakram.post('http://localhost:8080/api/trends', 
           {"name": "Fixed-gear Bicycles", "from": 1950, "to": 1959});
  });

  it('should return an HTTP 201', function() {
    return expect(response).to.have.status(201);
  });

  it('should return only the new trend', function() {
    expect(response).to.be.an('array');
    expect(response).to.have.deep.members([
      {"name": "Fixed-gear Bicycles", "from": 1950, "to": 1959}
    ]);
    return chakram.wait();
  });
});
```


Nice Feature: Promises
--------------------------
Chakram has done a great job of making [JavaScript Promises](http://www.html5rocks.com/en/tutorials/es6/promises/) such a core part of the framework that you don't even notice them.  Every test returns a promise.  Every assertion returns a promise.  And here's the great part: You don't actually have to write any Promise syntax yourself!  Instead, all the ugliness and complexity of Promises are handled by Chakram.  You write your tests as though they were synchronous code, and Chakram will ensure that everything runs in the right order.

The only catch is that you have to remember to have a `return` statement at the end of each test.  This will return the last promise, which is how the test runner knows to wait for your asynchronous code to finish before it moves on to the next test.  Fortunately, Chakarm even makes this easier, with its [`chakram.wait()` method](https://dareid.github.io/chakram/jsdoc/module-chakram.html#.wait).

