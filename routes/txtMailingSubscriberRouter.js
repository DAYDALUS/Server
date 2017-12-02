'use strict'

var express = require('express'),
router = express.Router(),
cors = require('cors'),
expressSanitizer = require('express-sanitizer'),
Subscriber = require('../models/txtMailingSubscriberModel.js');


router.post("/saveSubscriber",function(req,res){
    var new_subscriber = new Subscriber(req.body);
    new_subscriber.save(function(err,subscriber){
        if (err){
            res.status(500).send({ error: err });
         }else{
         res.status(200).send({ data: subscriber });
         }
    });
});

module.exports = router;