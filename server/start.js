var childProcess = require('child_process');
var path = require('path');
var server = path.join(__dirname, 'index.js');

if (/^win/.test(process.platform)) {
  // Windows doesn't support running a fork as a background process. :(
  // Windows users will have to open two command prompts, one to run the server, and one for the tests
  require(server);
}
else {
  // On OSX and Linux, we can start the server as a background process.
  // This allows the same terminal window to run the server and the tests.
  childProcess.fork(server, ['--background', '--silent']);
  process.exit();
}
