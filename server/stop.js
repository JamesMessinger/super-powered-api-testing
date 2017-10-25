var http = require('http');

// Stop the demo server
http.get('http://localhost:8080/stop')

  .on('error', function(err) {
    switch (err.code) {
      case 'ECONNREFUSED':
        // The server was already stopped
        break;

      case 'ECONNRESET':
        // The server was stopped successfully
        break;

      default:
        // Something went wrong
        console.error(err.code);
    }
  });
