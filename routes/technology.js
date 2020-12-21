'use strict';
const express = require('express');
const app = express.Router();
const Technology = require('../controller/technology');

app.post('/:userId/:screen', Technology.saveTechnologyDetails);
app.put('/technology_extra_info/:userId', Technology.updateTechnologyDetails);

module.exports = app;
