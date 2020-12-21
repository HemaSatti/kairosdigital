'use strict';
var express = require('express');
var app = express.Router();
var Questions = require('../controller/questions');

app.post('/quest', Questions.saveQuestionDetails);
app.get('/quest/:userId/:screen', Questions.findQuestionDetails);

module.exports = app;

