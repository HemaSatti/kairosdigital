'use strict';
var express = require('express');
var app = express.Router();
var User = require('../controller/users');

app.post('/users',User.saveUserDetails);        //post api for user details


module.exports = app;
