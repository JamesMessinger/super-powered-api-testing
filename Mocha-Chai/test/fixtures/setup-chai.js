/**
 * Loads Chai.js and the Chai-HTTP plugin
 */
(function () {

  if (host.node) {
    // In Node.js, we need to explicitly require Chai and its plugins
    host.global.chai = require('chai');
    var chaiHttp = require('chai-http');
    var chaiJsonSchema = require('chai-json-schema');

    // Load the Chai plugins
    chai.use(chaiHttp);
    chai.use(chaiJsonSchema);
  }
  else {
    // In web browsers, Chai and its plugins are globals
    chai.use(host.global.chaiHttp);
  }

  // Enable Chai's "expect" and "should" syntaxes
  chai.should();
  host.global.expect = chai.expect;

}());
