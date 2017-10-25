var express = require('express');
var marked = require('marked');
var path = require('path');
var fs = require('fs');

var router = module.exports = express.Router();

// Serve semi-static files :)
router.get('/', wrapHtml(path.resolve(__dirname, 'www/index.html')));
router.get('/tests/chai-http/', wrapMarkdown(path.resolve(__dirname, '../tests/chai-http/README.md')));
router.get('/tests/chakram/', wrapMarkdown(path.resolve(__dirname, '../tests/chakram/README.md')));
router.get('/tests/postman/', wrapMarkdown(path.resolve(__dirname, '../tests/postman/README.md')));
router.get('/tests/supertest/', wrapMarkdown(path.resolve(__dirname, '../tests/supertest/README.md')));

// Serve static files
router.use('/', express.static(path.resolve(__dirname, 'www')));
router.use('/api', express.static(path.resolve(__dirname, '../api')));
router.use('/docs', express.static(path.resolve(__dirname, '../docs')));
router.use('/tests', express.static(path.resolve(__dirname, '../tests')));
router.use('/node_modules', express.static(path.resolve(__dirname, '../node_modules')));


// Wrap HTML or Markdown files inside "template.html"
var utf8 = {encoding: 'utf8'};
var template = fs.readFileSync(path.resolve(__dirname, 'www/template.html'), utf8);

function wrapHtml(file) {
  return function(req, res, next) {
    fs.readFile(file, utf8, function(err, html) {
      if (err) return next(err);
      res.send(template.replace('CONTENT_PLACEHOLDER', html));
    })
  };
}

function wrapMarkdown(file) {
  return function(req, res, next) {
    fs.readFile(file, utf8, function(err, md) {
      if (err) return next(err);
      res.send(template.replace('CONTENT_PLACEHOLDER', marked(md)));
    });
  };
}
