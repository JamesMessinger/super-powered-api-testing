var express = require('express');
var bodyParser = require('body-parser');
var ono = require('ono');
var util = require('./util');

var trends = [];
var api = module.exports = express.Router();


// Parse HTTP request bodies
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json({type: function(req) {
  return /json|text|undefined/.test(req.headers['content-type']);
}}));


// GET /trends
api.get('/trends', function(req, res, next) {
  res.json(util.sort(trends));
});


// DELETE /trends
api.delete('/trends', function(req, res, next) {
  // Reset all data
  trends = [];
  res.status(204).send();
});


// POST /trends
api.post('/trends', function(req, res, next) {
  // Validate the Trend
  var trend = util.validate(req.body);

  // Get any existing date ranges for this trend
  var existing = trends.filter(util.byName(trend.name));

  // Has this trend been popular too recently?
  var conflicts = existing.filter(util.between(trend.from - 10, trend.to + 10));

  if (conflicts.length === 0) {
    // Success! Add the new trend
    trends.push(trend);

    // Return all date ranges for this trend (including the new date range)
    existing.push(trend);
    res.status(201).json(util.sort(existing));
  }
  else {
    // Conflict!
    var conflict = conflicts[0];
    throw ono({ status: 409 }, '%s can\'t be trendy again so soon. It was already trendy from %d to %d',
      trend.name, conflict.from, conflict.to);
  }
});


// GET /trends/{filter}
api.get('/trends/:filter', function(req, res, next) {
  var filteredTrends = trends.filter(util.byNameOrYear(req.params.filter));
  if (filteredTrends.length > 0) {
    // Success! Return the trends
    res.json(util.sort(filteredTrends));
  }
  else {
    // No trends were found :(
    var year = parseInt(req.params.filter);
    throw ono({ status: 404 }, req.params.filter, year ? 'isn\'t a trendy year' : 'aren\'t trendy');
  }
});


// DELETE /trends/{name}
api.delete('/trends/:name', function(req, res, next) {
  var existing = trends.filter(util.byName(req.params.name));
  existing.forEach(function(trend) {
    trends.splice(trends.indexOf(trend), 1);
  });
  res.status(204).send();
});
