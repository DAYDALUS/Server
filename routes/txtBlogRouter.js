'use strict'

var express = require('express'),
router = express.Router(),
cors = require('cors'),
Blog = require('../models/txtBlogModel.js');


router.post("/saveBlog",function(req,res){
    var new_blog = new Blog(req.body);
    new_blog.save(function(err,blog){
        if (err){
            res.status(500).send({ error: err });
         }else{
         res.status(200).send({ data: blog });
         }
    });
});

router.get("/findBlogs", function(req,res){
    Blog.find().sort({ date: -1 }).exec(function(err, result){
        if (err){
            res.status(500).send({ error: err });
         }else{
            res.status(200).send({ data: result });
         }
    })
})

module.exports = router;