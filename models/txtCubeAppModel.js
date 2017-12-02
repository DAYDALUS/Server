'use strict'

var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//SANITIZATION
var xss = require('xss');
var html = xss('<script>alert("xss");</script>');
console.log(html);

var html = xss(cubeAppSchema, {
  whiteList:          [],        // empty, means filter out all tags
  stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
  stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                 // to filter out its content
});
console.log('text: %s', html);

var cubeAppSchema = new Schema({
    user_id: { type: String, required:true},
    full_name: { type: String, required:true},
    email: { type: String, required: true},
    phone_number: { type: String, required: true},
    web_img_url: { type: String, required: true},
    signed_in: { type: Boolean, required: true, unique:true},
    date: { type: Date, default: Date.now , required:true}
},
{
    collection: 'exploringTechCubeApp'
}
);


module.exports = mongoose.model('CubeApp', cubeAppSchema);
