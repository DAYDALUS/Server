'use strict'

var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//SANITIZATION
var xss = require('xss');
var html = xss('<script>alert("xss");</script>');
console.log(html);

var html = xss(mentorSchema, {
  whiteList:          [],        // empty, means filter out all tags
  stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
  stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                 // to filter out its content
});
console.log('text: %s', html);


var mentorSchema = new Schema({
    fullname: { type: String, lowercase:true,required:true },
    email: {type: String, validate: [validator.isEmail, 'invalid email'],required:true},
    phoneNumber: {type:String,required:true},
    company: {type: String, lowercase:true,required:true},
    title: {type: String, lowercase:true,required:true},
    reference: {type: String, lowercase:true,required:true},
    experience: {type: String, lowercase:true,required:true},
    mentorInterest: {type: String, lowercase:true,required:true},
    hearAboutTxt: {type: String, lowercase:true,required:true},
    interests:  {type: String, lowercase:true,required:true},
    commitment: {type: String, lowercase:true,required:true},
    length: {type: String, lowercase:true,required:true},
    student: {type: String, lowercase:true,required:true},
    date: { type: Date, default: Date.now,required:true}
},
{
    collection: 'exploringTechMentors'
}
);


module.exports = mongoose.model('Mentor', mentorSchema);
