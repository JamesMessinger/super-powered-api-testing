[![Super-Powered API Testing](assets/img/title-banner.png)](https://apitesting.jamesmessinger.com)

What is this?
--------------------------------------------------------------------------------
This website accompanies a talk/workshop ([here's the slide deck](https://github.com/James-Messinger/super-powered-api-testing/blob/master/presentation.pdf)) that discusses and compares various API testing tools and best-practices.  I've re-created the same API test suite in several different tools to make it easy to compare and contrast them in terms of features, ease-of-use, syntax, etc.


Demo API
--------------------------------------------------------------------------------
This is the REST API that we're testing.  It's a fun list of technology-themed superheroes, sidekicks, and villains.

- [Demo website](https://heroes.jamesmessinger.com/)
- [The Raw API](https://api.heroes.jamesmessinger.com/)
- [API documentation](https://documenter.getpostman.com/view/220187/super-tech-heroes-api/77cf6KB)
- [OpenAPI 3.0 definition](https://api.heroes.jamesmessinger.com/schema)
- [Swagger 2.0 definition](https://api.heroes.jamesmessinger.com/schema?accept=application/openapi+json;version=2.0)



API Testing Tools
--------------------------------------------------------------------------------

[![Mocha & Chai](assets/img/mocha-chai/logo.png)](mocha-chai/)
--------------------------------------------------------------------------------
Mocha and Chai are JavaScript libraries that make it easy to write complex API tests using an intuitive fluent syntax that's easy to learn.

[Features](mocha-chai/) | [Demo](mocha-chai/#demo-setup)



[![Restlet](assets/img/restlet/logo.png)](restlet/)
--------------------------------------------------------------------------------
Restlet is a free Chrome extension that's so easy to use that _anybody_ can build API tests.

[Features](restlet/) | [Demo](restlet/#demo-setup)



[![Postman](assets/img/postman/logo.png)](postman/)
--------------------------------------------------------------------------------
Postman is a free app that makes it easy to build, test, and document your APIs.  It has powerful API testing features that strike a good balance between power and ease-of-use.

[Features](postman/) | [Demo](postman/#demo-setup)



[![Stoplight](assets/img/stoplight/logo.png)](stoplight/)
--------------------------------------------------------------------------------
Stoplight is a powerful API development tool that's based on OpenAPI (fka Swagger).  Its tight integration with OpenAPI enables powerful features like automatic contract verification and code-coverage analysis.

[Features](stoplight/) | [Demo](stoplight/#demo-setup)
