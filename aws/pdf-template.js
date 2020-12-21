'use strict';
const aws_ses = require('./aws-ses');
var template = require('es6-template-strings');
const path = require('path');
var fs = require('fs');
var pdf = require('html-pdf');
// var options = {format: 'A4'};
var options = {"format": 'Letter'};


exports.pdfReport = (userInfo, technologyInfo, callback) => {       // pdf report generating function
    console.log("COMING");
    var userEmailTemplate = path.join(__dirname, './sample-email-template.html');
    fs.readFile(userEmailTemplate, "UTF-8", function (err, data) {
        var params = {
            name: userInfo.name,
            company_name: userInfo.company_name,
            designation: userInfo.designation,
            industry: technologyInfo.industry,
            organizational_strategy:technologyInfo.organizational_strategy,
            customer_experience: technologyInfo.customer_experience,
            realtime_communication: technologyInfo.realtime_communication,
            information_model: technologyInfo.information_model,
            automated_analytics:technologyInfo.automated_analytics,
            linkedin_url: technologyInfo.linkedin_url,
            facebook_url: technologyInfo.facebook_url,
            twitter_url: technologyInfo.twitter_url,
            appstore_name: technologyInfo.appstore_name,
            playstore_name: technologyInfo.playstore_name,
            it_devops:technologyInfo.it_devops,
            continuous_integration:technologyInfo.continuous_integration,
            chatBots_chatOps:technologyInfo.chatBots_chatOps,
            social_handles:technologyInfo.social_handles,
            enterprise_percentage: technologyInfo.enterprise_percentage,
            commonContent:"HI Welcome to Kairos digital transformation "
            // aaa:aaa
        };
        var messageStr = template(data, params);
        pdf.create(messageStr, options).toFile(`./${params.name.replace(/\s+/g, '_')}.pdf`, function (err, result) {   //create a pdf with html-pdf package
            if (err) return console.log(err)
            else {
                var attachment_name = params.name.replace(/\s+/g, '_');
                var attach = result.filename;
                var to = userInfo.email;
                var bcc = "ashwin.p@kairostech.com";
                // var bcc = "veni@skil.app";
                var name = userInfo.name;
                aws_ses.sendEmailforUserPDF(to, name, bcc, attachment_name, attach, function (err, result1) {        // sending email with pdf report
                     // console.log("ccccccccccccccccccc", name);
                    callback(err, result1);
                    fs.unlinkSync(result.filename);                         // deleted generated pdf report
                    console.log("deleted successfully");
                })
            }
        });
    });
}


