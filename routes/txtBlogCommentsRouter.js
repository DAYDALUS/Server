'use strict'

var express = require('express'),
router = express.Router(),
cors = require('cors'),
characters = 'abcdefghijklmnopqrstuvwxyz0123456789',
ObjectID = require('mongodb').ObjectID,
Comment = require('../models/txtBlogCommentsModel.js');

// generates a psuedorandom slug string
function myFunction(callback){
    var text = "";
    for( var i =0; i < 5; i++){
        text += characters.charAt(Math.floor(Math.random() * characters.length));        
    }
    callback(text);
}

router.post("/saveParentComment",function(req,res){
    myFunction(callback)
    function callback(result){
        var id = new ObjectID();
        var slug = result;
        var full_slug = Date.now() + ':' + slug;

        req.body.slug = slug;
        req.body.full_slug = full_slug;
        req.body.parentId = id;
        req.body.parent = true;

        var new_parent_comment = new Comment(req.body);
        new_parent_comment.save(function(err,result){
            if (err){
                res.status(500).send({ error: err });
             }else{
                res.status(200).send({ data: result });
             }
        })
    }
});

router.post("/saveChildComment",function(req,res){
    myFunction(callback)
    function callback(result){
        var slug = result;
        var full_slug = Date.now() + ':' + slug;

        req.body.slug = slug;
        req.body.full_slug = full_slug;
        req.body.parent = false;

        var new_child_comment = new Comment(req.body);
        new_child_comment.save(function(err,result){
            if (err){
                res.status(500).send({ error: err });
             }else{
                res.status(200).send({ data: result });
             }
        })
    }
});

router.get("/findParentComments", function(req,res){
    Comment.find({ parent: true }, 'author content').sort({ date: -1 }).exec(function(err, result){
        if (err){
            res.status(500).send({ error: err });
         }else{
            res.status(200).send({ data: result });
         }
    })
})
router.get("/findChildComments", function(req,res){
    console.log(req.headers)
    Comment.find({ parent: req.headers.parentid }, 'author content').sort({ date: -1 }).exec(function(err, result){
        if (err){
            res.status(500).send({ error: err });
         }else{
            res.status(200).send({ data: result });
         }
    })
})

module.exports = router;