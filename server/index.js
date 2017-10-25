var express = require('express');
var ono = require('ono');
var modes = require('./modes');
var static = require('./static');
var api = require('./api');

var app = express();

// Normal/background/silent modes
app.use(modes);

// Static files
app.use(static);

// REST API
app.use('/api', api);

// 404
app.use(function(req, res, next) {
  throw ono({ status: 404 }, req.url, 'could not be found');
});

// Error handler
app.use(function(err, req, res, next) {
  err.status = err.status || 500;
  res.status(err.status).json({
    error: err.status,
    message: err.message
  });

  if (err.status >= 500) {
    // Server error! Write the details to the console
    console.error('HTTP %d %s', err.status, err.stack);
  }
});

// Start the server on port 8080
app.listen(8080);

// Crash gracefully
process.on('uncaughtException', function(err) {
  if (err.code === 'EADDRINUSE') {
    console.warn('       (The server was already running)');
    return process.exit();
  }
  throw err;
});
