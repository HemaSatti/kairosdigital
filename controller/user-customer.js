'use strict';
const async = require('async');
const {User} = require('../models/user');
const {Customer, validate} = require('../models/customer');
const {Technology} = require('../models/technology');
// const {Questions} = require('../models/questions');

exports.findUserDetailsById =  async(userId, callback) =>{      //Find user details in database using by ID
    const UserId = userId;
    // console.log("USER ID IS 888", UserId);
    await User.find({userId:UserId}).exec(function(err, result){
        if(err){
        console.log("Find user details by id error is:", err);
    }
    else{
        // console.log("user result is:", result);
        callback(null, result);
        }
    });
}

exports.findCustomerDetailsById = async (userId, callback) =>{   //Find customer details in database by user id from users table
    const UserId = userId;
    // console.log("USER ID IS", UserId);
    await Customer.find({userId:UserId}).exec(function(err, result){
        if(err)
        console.log("Find customer details by id error is:", err);
        // return callback(err);
        else{
             console.log("Find customer details by id result is:", result);
            callback(null, result);
        }
    });
}

exports.findTechnologyDetailsById = async(userId, callback) => {
    const UserId = userId;
    await Technology.find({userId:UserId}).exec(function(err, result){
        if(err)
            console.log("Find technology details by id error is:", err);
        else{
            // console.log("Find technology details by id result is:", result);
            callback(null, result);
        }
    })
}
