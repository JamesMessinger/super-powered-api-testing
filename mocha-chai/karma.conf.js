// Karma config
// https://karma-runner.github.io/0.12/config/configuration-file.html

'use strict';

module.exports = function (karma) {
  karma.set({
    frameworks: ['mocha', 'chai', 'host-environment'],

    files: [
      // Third-Party Libraries
      'lib/chai-http.js',
      'lib/jsonpointer.js',
      'lib/tv4.js',
      'lib/chai-json-schema.js',

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
  var isCI = process.env.CI;
  var isMac = /^darwin/.test(process.platform);
  var isWindows = /^win/.test(process.platform);
  var isLinux = !isMac && !isWindows;

  if (isCI) {
    return ['Firefox', 'ChromeHeadless'];
  }
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
