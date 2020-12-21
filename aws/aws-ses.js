'use strict';
//configure AWS using access key and secret access
const AWS = require('aws-sdk');
AWS.config.region = "us-east-1";
AWS.config.accessKeyId = "AKIAJ43R3VYECFWJDOBQ";
AWS.config.secretAccessKey = "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";
var fs = require('fs');
var template = require('es6-template-strings');
const path = require('path');
const ses = new AWS.SES();
// require('dotenv').config();

exports.sendEmailforUser = (to, subject, message, callback) => {    // AWS SES functionality for normal email body
    const params = {
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: message
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        ReturnPath: 'chshashidhar2002@gmail.com',
        Source: 'chshashidhar2002@gmail.com'
    }

    ses.sendEmail(params, (err, data) => {
        if (err) console.log(err, err.stack)
        else {
            console.log("Send email successfully. ses data:", data);
            callback(null, data);
        }
    })
}

exports.sendEmailforUserPDF = (to, name, bcc, attachment_name, attach, callback) => {    // AWS SES functionality for attachment
    var email = "chshashidhar2002@gmail.com";
    var messageBody ="<h4>Dear " +name+",</h4><p>Greetings from Kairos Technologies Inc. Thanks for completing our mini-assessment questionnaire to help us create a customized roadmap for your organization's digital transformation.</p>";
    var messageBody1 = "<p>Please find attached a document covering several initiatives you can consider on the vision, strategy, innovation, and organizational processes in creating world-class digital customer experiences.</p>";
    var messageBody2 = "<p>You can explore our Digital Transformation and Digital Quality Assurance services from the below links:</p>";
    var messageBody3 = "<a href=\"https://www.kairostech.com/digital-transformation/\">https://www.kairostech.com/digital-transformation/</a><br/><a href=\"https://www.kairostech.com/digital-quality-assurance/\">https://www.kairostech.com/digital-quality-assurance/</a>";
    var messageBody4 ="<p>Feel free to contact us at <a href=\"mailto:customerfirst@kairostech.com\">customerfirst@kairostech.com</a> to tap more information from our subject matter experts!</p>"
    var messageBody5 ="<p>Thanks,<br/>Team Kairos.</p>"
    // console.log("DDDDDDDDDDDDDD", name);
    // var data = fs.readFileSync("E:/KairosDNew/veni11.pdf");
    var data = fs.readFileSync(attach);
    var ses_mail = "From: 'KairosD Team'<"+email+"> \n";
    ses_mail += "To: " + to + "\n";
    ses_mail += "Bcc:" + bcc + "\n";
    // ses_mail += bcc && bcc.length ? 'Bcc: ' + asOptionalArray(bcc) + '\n' : ''
    ses_mail = ses_mail + "Subject: PDF Report\n";
    // ses_mail = ses_mail + "MIME-Version: 1.0\n";
    ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
    ses_mail = ses_mail + "--NextPart\n";
    ses_mail = ses_mail + "Content-Type: text/html\n\n";
    ses_mail = ses_mail+ messageBody + messageBody1 + messageBody2 + messageBody3 + messageBody4 + messageBody5 ;
    // ses_mail += bodyMessage + "\n";
    ses_mail += "\n\n";
    ses_mail += "--NextPart\n";
    ses_mail = ses_mail + "Content-Type: application/octet-stream; name=" + attachment_name + ".pdf \n";
    ses_mail = ses_mail + "Content-Transfer-Encoding: base64\n";
    ses_mail = ses_mail + "Content-Disposition: attachment\n\n";
    ses_mail = ses_mail + data.toString("base64").replace(/([^\0]{76})/g, "$1\n") + "\n\n";
    ses_mail = ses_mail + "--NextPart\n";
    var params = {
        RawMessage: {Data: ses_mail},
        Source: "'AWS Tutorial Series' <" + email + ">'"
    };
    ses.sendRawEmail(params, function (err, data) {
        if (err) {
            console.log("PDF Error is:", err);
            callback(err)
        } else {
            console.log("sending email successfull", data);
            callback(null, data);
        }
    });
}
