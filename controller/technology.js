'use strict';
const {Technology, validate} = require('../models/technology');
var user_customer = require('../controller/user-customer');
const Questions = require('../controller/questions');
const email = require('../aws/pdf-template');
const fs = require('fs');

exports.saveTechnologyDetails = async (req, res) => {
    console.log("FFFFFFFFFFFFF");
    const {error} = validate(req.body);
    if (error) {
        console.log("ERRROR is", error);
        return res.status(400).send(error.details[0].message);
    } else {
        let technology = new Technology({
            it_devops: req.body.it_devops,
            continuous_integration: req.body.continuous_integration,
            chatBots_chatOps: req.body.chatBots_chatOps,
            social_handles: req.body.social_handles,
            enterprise_percentage: req.body.enterprise_percentage,
            extra_info: {
                linkedin_url: req.body.linkedin_url,
                facebook_url: req.body.facebook_url,
                twitter_url: req.body.twitter_url,
                appstore_name: req.body.appstore_name,
                playstore_name: req.body.playstore_name
            }
        });
        technology.userId = req.params.userId;
        technology.screen = req.params.screen;
        await user_customer.findUserDetailsById(technology.userId, (err, data) => {
            if (err) {
                res.send("The user with the given id was not found", err);
            } else {
                user_customer.findTechnologyDetailsById(technology.userId, (err, data1) => {
                    if (data1.length != 0) {
                        console.log("dataaa", data1);
                        Technology.findOneAndUpdate({userId: technology.userId}, {
                            $set: {
                                it_devops: req.body.it_devops,
                                continuous_integration: req.body.continuous_integration,
                                chatBots_chatOps: req.body.chatBots_chatOps,
                                social_handles: req.body.social_handles,
                                enterprise_percentage: req.body.enterprise_percentage,
                            }
                        }, {new: true}, function (err, result) {
                            if (err)
                                console.log("Find technology details by id and update error is:", err);
                            else {
                                console.log("@@@@@@@@@@@@@@@@@", result);
                                res.send(result);
                            }
                        });
                    } else {
                        // console.log("customer data is", data);
                        technology.save(function (err, result1) {
                            if (err) {
                                res.send("customer details error", err);
                            } else {
                                res.send(result1);
                            }
                        });
                    }
                });
            }
        })
    }
}


exports.updateTechnologyDetails = async (req, res) => {
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    Technology.userId = req.params.userId;
    await user_customer.findUserDetailsById(Technology.userId, (err, data) => {
        // var obj = data;
        var userInfo = {
            email: data[0].email,
            name: data[0].name,
            company_name: data[0].company_name,
            designation: data[0].designation
        }
        console.log("USER DETAILS", userInfo);
        if (err) {
            res.send('The user with the given ID was not found', err);
        } else {
            user_customer.findCustomerDetailsById(Technology.userId, (err, data1) => {
                var customerInfo = {
                    industry: data1[0].industry,
                    organizational_strategy: data1[0].organizational_strategy,
                    customer_experience: data1[0].customer_experience,
                    realtime_communication: data1[0].realtime_communication,
                    information_model: data1[0].information_model,
                    automated_analytics: data1[0].automated_analytics
                }
                if (err) {
                    res.send('The user with the given ID was not found', err);
                } else {
                    Technology.findOneAndUpdate({userId: Technology.userId}, {
                        $set: {
                            "extra_info.linkedin_url":req.body.linkedin_url ? req.body.linkedin_url:'',
                            "extra_info.facebook_url":req.body.facebook_url ? req.body.facebook_url:'',
                            "extra_info.twitter_url":req.body.twitter_url ? req.body.twitter_url:'',
                            "extra_info.appstore_name":req.body.appstore_name ? req.body.appstore_name:'',
                            "extra_info.playstore_name":req.body.playstore_name ? req.body.playstore_name:'',
                        },
                    },{new: true}, function (err, result) {
                        if (err)
                            console.log("Find customer details by id and update error is:", err);
                        else {
                             console.log("##########", result);
                            Questions.findAllQuestions(Technology.userId, (err, pdfRes) => {
                                if (err) console.log("Error is:", err)
                                else {
                                    var technologyInfo = {
                                        industry: customerInfo.industry,
                                        organizational_strategy: customerInfo.organizational_strategy == "Yes" ? pdfRes[0].Company[0].yesResponse : pdfRes[0].Company[0].noResponse,
                                        customer_experience: customerInfo.customer_experience == "Yes" ? pdfRes[0].Company[1].yesResponse : pdfRes[0].Company[1].noResponse,
                                        realtime_communication: customerInfo.realtime_communication == "Yes" ? pdfRes[0].Company[2].yesResponse : pdfRes[0].Company[2].noResponse,
                                        information_model: customerInfo.information_model == "Yes" ? pdfRes[0].Company[3].yesResponse : pdfRes[0].Company[3].noResponse,
                                        automated_analytics: customerInfo.automated_analytics == "Yes" ? pdfRes[0].Company[4].yesResponse : pdfRes[0].Company[4].noResponse,
                                        it_devops: result.it_devops == "Yes" ? pdfRes[0].Technology[0].yesResponse : pdfRes[0].Technology[0].noResponse,
                                        continuous_integration: result.continuous_integration == "Yes" ? pdfRes[0].Technology[1].yesResponse : pdfRes[0].Technology[1].noResponse,
                                        chatBots_chatOps: result.chatBots_chatOps == "Yes" ? pdfRes[0].Technology[2].yesResponse : pdfRes[0].Technology[2].noResponse,
                                        social_handles: result.social_handles == "Yes" ? pdfRes[0].Technology[3].yesResponse : pdfRes[0].Technology[3].noResponse,
                                        enterprise_percentage: result.enterprise_percentage,
                                        linkedin_url: result.extra_info.linkedin_url,
                                        facebook_url: result.extra_info.facebook_url,
                                        twitter_url: result.extra_info.twitter_url,
                                        appstore_name: result.extra_info.appstore_name,
                                        playstore_name: result.extra_info.playstore_name,
                                    };
                                    email.pdfReport(userInfo, technologyInfo, function (err, result1) {
                                        if (err) {
                                            console.log("error in sending email--------", err);
                                            res.send(err)
                                        } else {
                                            console.log("send email successfull######", result1);
                                            res.send({
                                                UserDetails: userInfo,
                                                CustomerDetails: customerInfo,
                                                TechnologyDetails: result
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}
