'use strict'

var express = require('express'),
    router = express.Router(),
    cors = require('cors'),
    App = require('../models/txtCubeAppSignedInRecords.js');
// create login record with empty sign out date
router.post("/signIn", function (req, res) {
    var data = {
        key: req.body._id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    }
    var app = new App(data);
    app.save(function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send({
                error: err
            });
        } else {
            res.status(200).send({
                data: result
            });
        }
    });
});
// add sign out date to login record
router.post("/signOut", function (req, res) {
    var key = req.body.key;
    console.log(key)
    var date = new Date();
    App.findOneAndUpdate({
        key: key
    }, {
        sign_out_date: date
    }).exec(function (err, result) {
        if (err) {
            res.status(500).send({
                error: err
            });
        } else {
            res.status(200).json({
                data: result
            });
        }
    })
});




module.exports = router;