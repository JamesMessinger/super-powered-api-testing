/**
 * Sets environment-specific variables, such as hostnames, account numbers, etc.
 */
(function () {

  // Test the production API by default
  host.global.API_ROOT = getEnvironmentVariable('API_ROOT', 'https://api.heroes.bigstickcarpet.com');

  // Generate a unique API Key by default
  host.global.API_KEY = getEnvironmentVariable('API_KEY', Date.now().toString());


  // Returns the specified environment variable, or the default value
  function getEnvironmentVariable (name, defaultValue) {
    if (host.env[name]) {
      // Get the value from the environment variable
      return host.env[name];
    }
    else if (host.browser) {
      // We're running in a web browser, so parse the value from the querystring
      let parser = new RegExp('[?&]' + name + '=([^&]+)');
      let parsed = parser.exec(location.search);
      if (parsed) {
        return parsed[1];
      }
    }

    return defaultValue;
  }

}());
