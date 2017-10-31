[![Super-Powered API Testing](../assets/img/title-banner.png)](http://apitesting.bigstickcarpet.com)

[![Stoplight](../assets/img/stoplight/logo.png)](http://stoplight.io/)
================================================================================

[Stoplight](http://stoplight.io) is a powerful API development tool that's based on OpenAPI (fka Swagger).  It has tight integration with OpenAPI, including automatic contract verification.

- **[Demo setup instructions](#demo-setup)**
- **[Running tests in Stoplight](#test-runner)**
- **[Running tests from the command line](#cli)**


OpenAPI contract verification
--------------------------------------------------------------------------------
Stoplight is built on top of OpenAPI, so it can leverage the JSON Schemas in your API spec to do automatic contract verification.  You don't need to write any tests to verify that your API responses correctly match your JSON Schema contracts.  Stoplight will just do it for you.

![Stoplight contract verification](../assets/img/stoplight/contract-verification.gif)



Code coverage
--------------------------------------------------------------------------------
Because Stoplight knows your API definition, it knows which endpoints you have or haven't tested, and which response codes you've checked for.  Using this information, it can show you API code coverage results.  This is a tremendously helpful feature that no other API testing tool has.

![Stoplight screenshot](../assets/img/stoplight/coverage.gif)


<a id="demo-setup"></a>

Demo Setup
--------------------------------------------------------------------------------
In this demo, you'll run a full suite of API tests in Stoplight and from the command line.

### Step 1. Install Stoplight Scenarios
Go to the [Stoplight website](http://stoplight.io/platform/scenarios/) and download the Stoplight Scenarios app.  You'll need to create a free account first.

> **NOTE:** Be sure to download the **Scenarios** app, not the main Stoplight app.  This demo only runs on the Scenarios app

### Step 2. Open Stoplight Scenarios
The first time you open the Stoplight Scenarios, you'll need to sign in and create an organization.

### Step 3. Import the demo files
Go to the "Testing" tab and click the "New Collection" button.  Import the following collection file:

#### Stoplight Collection
This file contains the API requests and the test assertions.

[`http://apitesting.bigstickcarpet.com/stoplight/stoplight-collection.json`](http://apitesting.bigstickcarpet.com/stoplight/stoplight-collection.json)

#### Stoplight Environment
This file contains environment variables, which allow the same Stoplight tests to be run in different environments (e.g. development, staging, prod)

[`http://apitesting.bigstickcarpet.com/stoplight/stoplight-environment.json`](http://apitesting.bigstickcarpet.com/stoplight/stoplight-environment.jso)


