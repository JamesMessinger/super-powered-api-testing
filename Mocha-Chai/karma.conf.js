// Karma config
// https://karma-runner.github.io/0.12/config/configuration-file.html

'use strict';

module.exports = function (karma) {
  karma.set({
    frameworks: ['mocha', 'chai', 'host-environment'],

    files: [
      // Third-Party Libraries
      'https://cdn.rawgit.com/chaijs/chai-http/80b4efb1/dist/chai-http.min.js',
      'https://cdn.rawgit.com/alexeykuzmin/jsonpointer.js/57d7cf48/src/jsonpointer.js',
      'https://cdnjs.cloudflare.com/ajax/libs/tv4/1.3.0/tv4.min.js',
      'https://cdn.rawgit.com/chaijs/chai-json-schema/da14f449/index.js',

      // Test Fixtures
      'test/fixtures/*.js',

      // Tests
      'test/specs/**/*.spec.js',
    ],

    browsers: getBrowsersForCurrentPlatform(),

    // Set liberal tolerances to allow for slow/unreliable networks
    captureTimeout: 60000,
    browserDisconnectTimeout: 30000,
    browserDisconnectTolerance: 5,
    browserNoActivityTimeout: 60000,
    client: {
      mocha: {
        timeout: 10000,
      }
    },
  });
};


/**
 * Configures the browsers for the current platform
 */
function getBrowsersForCurrentPlatform () {
  var isMac = /^darwin/.test(process.platform);
  var isWindows = /^win/.test(process.platform);
  var isLinux = !isMac && !isWindows;

  if (isMac) {
    return ['Firefox', 'Chrome', 'Safari'];
  }
  else if (isLinux) {
    return ['Firefox', 'Chrome'];
  }
  else if (isWindows) {
    return ['Firefox', 'Chrome', 'IE'];
  }
}
