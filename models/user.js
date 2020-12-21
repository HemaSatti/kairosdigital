const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);
ObjectID = require('mongodb').ObjectID;

const userSchema = new mongoose.Schema({   //created a table for user details
  name: {
    type: String,
      // required: true,
      // minlength: 5,
      // maxlength: 50
   },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  designation: {
    type: String,
  },
  company_name: {
    type: String,
  },
  screen:{
    type:String,
  },
  system_ipadrress:{
    type:String,
  },
  // createdAt:{
  //   type:String,
  // },
  createdAtStr:{
    type:String
  },
  userId:mongoose.Schema.Types.String,
});


userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {   //user validations using Joi package
  const schema = {
    //userid: Joi.objectId(),
    name: Joi.string(),
    email: Joi.string().min(5).max(50).required().email(),
    designation: Joi.string(),
    company_name: Joi.string(),
    screen:Joi.string(),
    system_ipadrress:Joi.string()
  };
  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;
