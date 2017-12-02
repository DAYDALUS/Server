'use strict'

var express = require('express'),
router = express.Router(),
cors = require('cors'),
Mentor = require('../models/txtMentorModel.js');


router.post("/saveMentor",function(req,res){
    var new_mentor = new Mentor(req.body);
    new_mentor.save(function(err,mentor){
        if (err){
            res.status(500).send({ error: err });
         }else{
         res.status(200).send({ data: mentor });
         }
    });
});
// change
module.exports = router;