var express = require('express'),
router = express.Router(),
cors = require('cors'),
Volunteer = require('../models/txtVolunteerModel.js');



router.post("/saveVolunteer",function(req,res){
    var new_volunteer = new Volunteer(req.body);
    new_volunteer.save(function(err,volunteer){
        if (err){
           res.status(500).send({ error: err });
        }else{
        res.status(200).send({ data: volunteer });
        }
    });
});

module.exports = router;
