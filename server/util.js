var tv4 = require('tv4');
var ono = require('ono');
var swagger = require('../api/swagger.json');

// Filters trends by year
exports.byYear = function(year) {
  return function(trend) {
    return trend.from <= year && trend.to >= year;
  };
};

// Filters trends by name (case insensitive)
exports.byName = function(name) {
  name = name.trim().toLowerCase();
  return function(trend) {
    return trend.name.trim().toLowerCase() === name;
  };
};

// Filters trends by name or year
exports.byNameOrYear = function(filter) {
  var year = parseInt(filter);
  return year > 0 ? exports.byYear(year) : exports.byName(filter);
};

// Filters trends by date range
exports.between = function(from, to) {
  return function(trend) {
    return (trend.from >= from && trend.from <= to) ||
      (trend.to >= from && trend.to <= to);
  };
};

// Sorts the array of trends by name, then dates
exports.sort = function(trends) {
  return trends.sort(function(a, b) {
    var a_name = a.name.trim().toLowerCase();
    var b_name = b.name.trim().toLowerCase();
    if (a_name < b_name) return -1;
    if (a_name > b_name) return +1;
    if (a.from < b.from) return -1;
    if (a.from > b.from) return +1;
    if (a.to < b.to) return -1;
    if (a.to > b.to) return +1;
    return 0;
  });
};

// Validates a trend against the Swagger schema
exports.validate = function(trend) {
  trend.from = parseInt(trend.from);
  trend.to = parseInt(trend.to);

  if (trend.from > trend.to) {
    throw ono({ status: 400 }, 'The specified date range is invalid.');
  }

  var valid = tv4.validate(trend, swagger.definitions.trend);
  if (!valid) {
    throw ono(tv4.error, { status: 400 }, 'The trend is invalid.');
  }

  return trend;
};
