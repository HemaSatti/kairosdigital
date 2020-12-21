'use strict';
var { Customer, validate } = require('../models/customer');
var user_customer = require('../controller/user-customer');

exports.saveCustomerDetails = async (req, res) => {  // save the customer details
    const { error } = validate(req.body);
    if (error) {
        console.log("ERRROR is", error);
        return res.status(400).send(error.details[0].message);
    }
    else {
        let customer = new Customer({
            industry: req.body.industry,
            organizational_strategy:req.body.organizational_strategy,
            customer_experience: req.body.customer_experience,
            realtime_communication: req.body.realtime_communication,
            information_model: req.body.information_model,
            automated_analytics:req.body.automated_analytics,
            screen: req.body.screen
        });
        customer.userId = req.params.userId;
        customer.screen = req.params.screen;
        await user_customer.findUserDetailsById(customer.userId, (err, data) => {  // check user is existed in user table or not
            if (err) {
                res.send('The user with the given ID was not found', err);
            }
            else {
                user_customer.findCustomerDetailsById(customer.userId, (err, data1) => {
                    if (data1.length != 0) {
                        console.log("dataaa", data1);
                        Customer.findOneAndUpdate({userId: customer.userId}, {
                            $set: {
                                industry: req.body.industry,
                                organizational_strategy: req.body.organizational_strategy,
                                customer_experience: req.body.customer_experience,
                                realtime_communication: req.body.realtime_communication,
                                information_model: req.body.information_model,
                                automated_analytics: req.body.automated_analytics,
                                screen: req.body.screen
                            },
                        }, {new: true}, function (err, result) {
                            if (err)
                                console.log("Find customer details by id and update error is:", err);
                            else {
                                console.log("DDDDDDDDDDDDD", result);
                                res.send(result);
                            }
                        });
                    }
                    else{
                        customer.save(function (err, result1) {   // save the customer details in mongo database
                            if (err) {
                                res.send("customer details error", err);
                            }
                            else {
                                res.send(result1);
                            }
                        });
                    }
                })
                // console.log(" user data is", data);
            }
        });
    }
}


