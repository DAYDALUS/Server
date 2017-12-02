'use strict'

var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//SANITIZATION
var xss = require('xss');
var html = xss('<script>alert("xss");</script>');
console.log(html);

var html = xss(signedInSchema, {
  whiteList:          [],        // empty, means filter out all tags
  stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
  stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                 // to filter out its content
});
console.log('text: %s', html);


var signedInSchema = new Schema({
    full_name: { type: String, required:true},
    user_id: { type: String, required: true},
    sign_out_date: { type: Date, default: null},
    sign_in_date: { type: Date, default: Date.now , required:true},
    visit_duration: { type: Number, required:true}
},
{
    collection: 'exploringTechSignInRecords'
}
);


module.exports = mongoose.model('SignInApp', signedInSchema);
