'use strict';
const express = require('express');
const app = express.Router();
const Customer = require('../controller/customer');

app.post('/customers/:userId/:screen', Customer.saveCustomerDetails);       // put api for customer details

module.exports = app;
