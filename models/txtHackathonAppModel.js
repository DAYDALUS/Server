'use strict'
// HACKATHON MOBILE APP
var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//SANITIZATION
var xss = require('xss');
var html = xss('<script>alert("xss");</script>');
console.log(html);

var html = xss(appSchema, {
  whiteList:          [],        // empty, means filter out all tags
  stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
  stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                 // to filter out its content
});
console.log('text: %s', html);


var appSchema = new Schema({
    first_name: { type: String, required:true},
    last_name: { type: String, required:true},
    grade: { type: String, require:true},
    age: { type: Number, required:true},
    email: { type: String, required: true},
    phone_type: { type: String, required:true},
    phone_number: { type: Number, required: true},
    school: { type: String, required:true},
    ethnicity: { type: String, required: true},
    computers: { type: String, required: true},
    wifi: { type: String, required: true},
    key: { type: String, required: true},
    uploaded: { type: Boolean, required: true},
    date: { type: Date, default: Date.now , required:true}
},
{
    collection: 'exploringTechHackathonApp'
}
);


module.exports = mongoose.model('App', appSchema);
