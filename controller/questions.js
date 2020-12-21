'use strict';
var mongoose = require('mongoose');
var express = require('express');
var _ = require('lodash');
var { Questions } = require('../models/questions');
const user_customer = require('../controller/user-customer');

exports.saveQuestionDetails = async (req, res) => {
    let quest = new Questions(req.body);
    // console.log("BODYYYYYYYYYYYYY", req.body);
    quest._id = new mongoose.Types.ObjectId;
    quest.questionsId = quest._id.toHexString();
    if (quest.questionType == "yes/no") {
        quest.yesResponse = req.body.yesResponse;
        quest.noResponse = req.body.noResponse;
    }
    else if (quest.questionType == "slider") {
        quest.minValue = req.body.minValue ? req.body.minValue : 0;
    }
    else if (quest.questionType == "text") {
        quest.questionType = req.body.questionType;
        quest.defaultResponse = req.body.defaultResponse
    }
    await quest.save(function (err, result) {      // save the user details query
        if (err)
            console.log("SaveScreen1Details Error is:", err)
        else {
            // console.log("qqqqqqqqqqqq", result);
            res.send(result);
        }
    });
}

exports.findQuestionDetails = async (req, res) => {
    Questions.userId = req.params.userId;
    Questions.screen = req.params.screen;
    await user_customer.findUserDetailsById(Questions.userId, function(err, data){
        if(err)
        console.log("errrrrrrrrrrrr", err);
        else{           
            if(data.length != 0){
                //   console.log("FFFFFFFFFFFF", data);
                Questions.find({}, function (err, result) {      // save the user details query
                    if (err)
                        console.log("getScreen1Details Error is:", err)
                    else {
                        var result1 = [];
                        if (Questions.screen == "Company") {
                            // console.log("EEEEEEEEEEEEEEEEE", result[0].Company);
                            for (var i = 0; i < result[0].Company.length; i++) {
                                var result2 = { question: result[0].Company[i].question, questionType: result[0].Company[i].questionType };
                                
                                result1.push(result2);
                            }
                            res.send(result1);
                        }
                        else {
                            for (var i = 0; i < result[0].Technology.length; i++) {
                                var result2 = { question: result[0].Technology[i].question, questionType: result[0].Technology[i].questionType };
                                result1.push(result2);
                            }
                            res.send(result1);
                        }
                        // res.send(result[0].Technology)
                    }
                });
            }
            else{
                console.log("Sorry the user doesnot exist with id");
            }
                
        }
    })
   
}


exports.findAllQuestions = async(userId, callback) => {
   const UserId = userId;
//   console.log("QQQQQ", UserId);
  await Questions.find({}).exec(function(err, result){
    if(err){
    console.log("Find user details by id error is:", err);
    }
    else{
    // console.log("QQQQQQQQQQQQQQQQQQQQQQresult is:", result);
    callback(null, result);
    }
});
   
}
