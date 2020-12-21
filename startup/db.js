 const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {     //mongoose connection
  var url01 = 'mongodb://KairosAdmin:Admin@1234@cluster0-shard-00-00-6g7bx.mongodb.net:27017,cluster0-shard-00-01-6g7bx.mongodb.net:27017,cluster0-shard-00-02-6g7bx.mongodb.net:27017/test?retryWrites=true&w=majority';
  var dbURI ='mongodb+srv://KairosAdmin:Admin@1234@cluster0-6g7bx.mongodb.net/test?retryWrites=true&w=majority';
  const options = {
    useNewUrlParser: true
  };
   mongoose.connect(dbURI, options)
    .then(() => winston.info('Connected to MongoDB...'));
}
