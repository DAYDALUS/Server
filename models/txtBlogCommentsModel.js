'use strict'

var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId
//SANITIZATION
var xss = require('xss');
var html = xss('<script>alert("xss");</script>');
console.log(html);

var html = xss(commentSchema, {
  whiteList:          [],        // empty, means filter out all tags
  stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
  stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                 // to filter out its content
});
console.log('text: %s', html);

var commentSchema = new Schema({
    discussionId: { type: String, required:true, unique: false},
    parentId: { type: String, required:true, unique:true},
    parent: { type: Boolean, required: true},
    slug: { type: String, required: true},
    full_slug: { type: String, required: true},
    author: {
        name: { type: String, required:true }
    },
    replies: { type: Number, default: 0, required:true},
    content: { type: String, required:true},
    date: { type: Date, default: Date.now , required:true}
},
{
    collection: 'exploringTechComments'
}
);


module.exports = mongoose.model('Comments', commentSchema);
