'use strict'

var express = require('express'),
router = express.Router(),
cors = require('cors'),
Contact = require('../models/txtWebsiteContactUsModel.js');


router.post("/saveContact",function(req,res){
    var new_contact = new Contact(req.body);
    new_contact.save(function(err,contact){
        if (err){
            res.status(500).send({ error: err });
         }else{
         res.status(200).send({ data: contact });
         }
    });
});

module.exports = router;