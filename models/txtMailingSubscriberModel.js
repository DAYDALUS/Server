'use strict'

var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//SANITIZATION
var xss = require('xss');
var html = xss('<script>alert("xss");</script>');
console.log(html);

var html = xss(subscriberSchema, {
  whiteList:          [],        // empty, means filter out all tags
  stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
  stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                 // to filter out its content
});
console.log('text: %s', html);


var subscriberSchema = new Schema({
    email: {type: String, validate: [validator.isEmail, 'invalid email'],required:true},
    date: { type: Date, default: Date.now,required:true}
},
{
    collection: 'exploringTechSubscriber'
}
);


module.exports = mongoose.model('subscriber', subscriberSchema);
