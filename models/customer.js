const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);
ObjectID = require('mongodb').ObjectID;

var CustomerSchema = mongoose.Schema({   // created table for customer details
  // userId: mongoose.Schema.Types.String,
  userId: {
    type: String,
  },
  industry: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  organizational_strategy:{
    type:String,
  },
  customer_experience: {
    type: String,
  },
  realtime_communication: {
    type: String,
  },
  information_model:{
    type:String,
  },
  automated_analytics: {
    type: String,
  },
  screen:{
    type:String
  },
});

const Customer = mongoose.model('Customer', CustomerSchema);

function validateCustomer(customer) {
  const schema = {
    industry: Joi.string().min(2).max(50),
    organizational_strategy: Joi.string(),
    customer_experience: Joi.string(),
    realtime_communication: Joi.string(),
    information_model: Joi.string(),
    automated_analytics: Joi.string(),
    screen:Joi.string(),
  };

  return Joi.validate(customer, schema);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
