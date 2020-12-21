const express = require('express');
const users = require('../routes/users');
const customers = require('../routes/customers');
const technologies = require('../routes/technology');
const questions = require('../routes/questions');
const auth = require('../routes/auth');
const error = require('../middleware/error');
var path = require('path');

module.exports = function (app) {
  app.use(express.json());
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    next();
  });
  app.use('/api', users);
  app.use('/api/customer', customers);
  app.use('/api/technology', technologies);
  app.use('/api/questions', questions);
  app.use('/api/auth', auth);
  app.use(express.static(path.join(__dirname, '../Client/dist')));
  app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/dist/index.html'));
  });
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../Client/dist/index.html'));
  })
  app.use(error);
}

