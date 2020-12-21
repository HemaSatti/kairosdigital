'use strict';
var mongoose = require('mongoose');
var express = require('express');
var moment = require('moment');
var _ = require('lodash');
var app = express.Router();
var { User, validate } = require('../models/user');

exports.saveUserDetails = async (req, res) => {  // save the user details in mongodb
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log("Email is", req.body.email);
    if (req.body.email) {
        var str = req.body.email;
        var n = str.includes("gmail" || "yahoo" || "hotmail");
        if (n) {
            res.send("Email_id should be company email")
        }
    }
    // let user = await User.findOne({ email: req.body.email });  // First check whether the user is new one or existed one
    // if (user) {
    //     return res.status(200).send({UserId:user.userId, status:'success', message:'user already existed with this email'});
    // }
    // else {
        let user = new User(req.body)
        user._id = new mongoose.Types.ObjectId;
        user.userId = user._id.toHexString();
        // user.createdAt = moment().toDate();
        user.createdAtStr = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
        console.log("dates",user.createdAt, "ewtrr",user.createdAtStr );
        await user.save(function (err, result) {      // save the user details query
            if (err)
                console.log("SaveUserDetails Error is:", err)
            else {
                console.log("saveUserDetails", result);
                res.send(result);
            }
        });
    //}
}





