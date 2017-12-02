'use strict'

var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//SANITIZATION
var xss = require('xss');
var html = xss('<script>alert("xss");</script>');
console.log(html);

var html = xss(blogsSchema, {
  whiteList:          [],        // empty, means filter out all tags
  stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
  stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                 // to filter out its content
});
console.log('text: %s', html);

var blogsSchema = new Schema({
    title: { type: String, lowercase:true, required:true },
    imgURL: {type: String, required:true},
    author: {type: String, lowercase:true, required:true},
    content: {type: String, lowercase:true, required:true},
    discussionId: { type: String, default: new mongoose.Types.ObjectId(), required:true, unique:true},
    date: { type: Date, default: Date.now , required:true}
},
{
    collection: 'exploringTechBlogs'
}
);


module.exports = mongoose.model('Blogs', blogsSchema);
