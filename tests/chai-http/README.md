Super-Powered API Testing
============================

[![Chai HTTP](../../docs/chai.png)](http://chaijs.com/plugins/chai-http)

Chai HTTP is an assertion library that uses [SuperAgent](https://visionmedia.github.io/superagent/) under the hood to do HTTP requests, and then lets you do assertions on the [HTTP response](https://visionmedia.github.io/superagent/#response-properties) using a really nice fluent syntax.

Here's an example:

```javascript
var response;

describe('add a trend', function() {
  before('add "Fixed-gear Bicycles"', function() {
    return http
      .post('/trends')
      .send({"name": "Fixed-gear Bicycles", "from": 1950, "to": 1959})
      .then(function(res) { response = res; });
  });

  it('should return an HTTP 201', function() {
    response.should.have.status(201);
  });

  it('should return only the new trend', function() {
    response.body.should.be.an('array').with.lengthOf(1);
    response.body.should.have.deep.members([
      {"name": "Fixed-gear Bicycles", "from": 1950, "to": 1959}
    ]);
  });
});
```


Killer Feature: Browser testing
--------------------------
Chai-HTTP is the only framework that lets you run your tests in web browsers in addition to the CLI.  This is a **huge feature**, since there's a really good chance that the apps that consume your REST API will be web-based, so Chai-HTTP allows you to run your tests in _real-world_ scenarios.

Any web-based application (including [hybrid mobile apps](http://developer.telerik.com/featured/what-is-a-hybrid-mobile-app/)) is subject to the [Same-Origin Policy](https://en.wikipedia.org/wiki/Same-origin_policy) and [Content Security Policy](https://en.wikipedia.org/wiki/Content_Security_Policy), which limits _many_ of the HTTP features that are accessible to the app. The app may not be able to read or write certain HTTP headers (including cookies), it may not be allowed to use certain HTTP methods (post, delete, etc.), and it might not be allowed to access certain resources or domains.

With Chai-HTTP, you can run your entire test suite in _any_ web browser and on _any_ mobile device.  So not only can you be assured that your API works in those environments, but you can also write tests **for your customers** to run from their app/domain/sandbox.


### How to test in a browser
To run the Chai-HTTP tests in a browser, you'll first need to start the local web server (using the [`npm start`](https://github.com/BigstickCarpet/super-powered-api-testing#running-the-tests-in-a-cli) command), and then browse to [http://localhost:8080/tests/chai-http/browser.html](http://localhost:8080/tests/chai-http/browser.html).

> **Bonus!** You can click on any test to see the code for that test.

> **Bonus!** You can click the arrow next to any test to run _just_ that test. This is great for debugging!

![Browser example](../../docs/browser.gif)
