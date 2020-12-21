const config = require('config');
const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
    Company:[{
    question:{
        type:String,
    },
    questionType:{
        type:String
    },
    yesResponse:{
        type:String
    },
    noResponse:{
        type:String
    },
    defaultResponse:{
        type:String
    },    
},
],
Technology:[{
    question:{
        type:String,
    },
    questionType:{
        type:String
    },
    yesResponse:{
        type:String
    },
    noResponse:{
        type:String
    },
    defaultResponse:{
        type:String
    },
    minValue:{
        type:Number
    }, 
}
],
questionsId:mongoose.Schema.Types.String,
}, {strict: false});

const Questions = mongoose.model('Questions', questionsSchema);
exports.Questions = Questions;
