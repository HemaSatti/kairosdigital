const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const technologySchema = new mongoose.Schema({
    userId:{
        type:String
    },
    it_devops:{
        type:String
    },
    continuous_integration:{
        type:String
    },
    chatBots_chatOps:{
        type:String
    },
    social_handles:{
        type:String
    },
    enterprise_percentage: {
        type: Number,
    },
    extra_info:{
        linkedin_url: {
            type: String,
        },
        facebook_url: {
            type: String,
        },
        twitter_url: {
            type: String,
        },
        appstore_name: {
            type: String,
        },
        playstore_name: {
            type: String,
        },
    }
});

const Technology = mongoose.model('Technology', technologySchema);

function validateTechnology(technology) {
    const schema = {
        it_devops: Joi.string(),
        continuous_integration: Joi.string(),
        chatBots_chatOps:Joi.string(),
        social_handles:Joi.string(),
        enterprise_percentage: Joi.number(),
        linkedin_url: Joi.string(),
        facebook_url: Joi.string(),
        twitter_url: Joi.string(),
        appstore_name: Joi.string(),
        playstore_name: Joi.string()
    };
    return Joi.validate(technology, schema);
}

exports.Technology = Technology;
exports.validate = validateTechnology;
