'use strict'

var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//SANITIZATION
var xss = require('xss');
var html = xss('<script>alert("xss");</script>');
console.log(html);

var html = xss(contactSchema, {
  whiteList:          [],        // empty, means filter out all tags
  stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
  stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                 // to filter out its content
});
console.log('text: %s', html);


var contactSchema = new Schema({
    fullname: { type: String, lowercase:true,required:true},
    email: {type: String, validate: [validator.isEmail, 'invalid email'],required:true},
    phoneNumber: {type:String,required:true},
    subject: {type: String, lowercase:true,required:true},
    comments: {type: String, lowercase:true,required:true},
    date: { type: Date, default: Date.now,required:true}
},
{
    collection: 'exploringTechContacts'
}
);


module.exports = mongoose.model('Contact', contactSchema);
