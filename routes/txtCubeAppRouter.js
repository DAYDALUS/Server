'use strict'

var express = require('express'),
    router = express.Router(),
    cors = require('cors'),
    superagent = require('superagent'),
    ObjectID = require('mongodb').ObjectID,
    slack_client_id = process.env.SLACK_CLIENT_ID,
    slack_client_secret = process.env.SLACK_CLIENT_SECRET,
    App = require('../models/txtCubeAppModel.js'),
    Records = require('../models/txtCubeAppSignedInRecords.js'),
    moment = require('moment');

// multer
var multer = require('multer');
var upload = multer();
var fs = require('fs');

// DROPBOX SDK
var Dropbox = require('dropbox');
var dbx = new Dropbox({
    accessToken: process.env.DROPBOX_KEY
});

// slack attachments
var attachment = require('../slack_attachments/cube_bot')

// var cron = require('node-cron');

// cron.schedule('0 0 0 * * *', function () {
//     console.log("running cron");
//     App.updateMany({ signed_in: true }, { $set: { signed_in: false } }, function (err, result) {
//         if (err) {
//             console.log(err);
//         }
//     });
// });

// SLACK bot /signin command api hook
// signs user in if exists
// retruns link to register if user does not exist
router.post('/slackLogIn', function (req, res) {
    if (req.body.channel_id == 'G7YT73MFE' || req.body.channel_id == 'C7ZQCAV8S') {
        var id = req.body.user_id;
        App.findOne({
            user_id: id
        }, function (err, user) {
            if (err) {
                res.status(500).send({
                    error: err
                });
            } else if (user == null) {
                res.status(200).send(attachment.user_not_found);
            } else {
                //check if user is signed in
                if (user.signed_in == true) {
                    res.status(200).send(attachment.user_already_signed_in);
                } else {
                    res.status(200).send(attachment.user_sign_out_time);
                    // signUserIn(user)
                }
            }
        })
    }else{
        res.status(200).send(attachment.channel_error);
    }

})

// slack button api
router.post('/slackChooseSignOut', function (req, res) {
    var data = JSON.parse(req.body.payload);
    var visit_duration = parseInt(data.actions[0].selected_options[0].value);
    var user_id = data.user.id;
    var now = moment.utc();
    var sign_out_date = moment.utc().add(visit_duration, 'h');

    // find user to pullout full name
    // changes signed_in from false to true
    App.findOne({
        user_id: user_id
    }, function (err, user) {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            user.signed_in = true;
            user.save(function (err, updatedUser) {
                if (err) {
                    res.send(err);
                }
                signUserIn(updatedUser);
            })
        }
    })

    // find create a sign in record for the user
    function signUserIn(user) {
        var data = {
            full_name: user.full_name,
            user_id: user.user_id,
            sign_out_date: sign_out_date,
            visit_duration: visit_duration
        }

        var record = new Records(data);
        record.save(function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err });
            } else {
                res.status(200).send(attachment.successful_login);
            }
        });
    }
})
// takes in code from approving slack bot
// returns user data
router.post('/token', function (req, res) {
    let code = req.body.code;
    superagent.get('https://slack.com/api/oauth.access')
        .query({
            client_id: slack_client_id,
            client_secret: slack_client_secret,
            code: code
        })
        .end((err, response) => {
            if (err) {
                return console.log(err);
            } else {
                res.send(response.text);
            }
        });
})
// Adds new user to cube database
router.post('/addUser', function (req, res) {

    App.findOne({
        user_id: req.body.user_id
    }, function (err, result) {
        if (err) {
            res.status(500).send({ error: err });
        } else if (result == null) {
            addUser();
        } else {
            res.status(200).send({ error: "User Already Exists" })
        }
    })
    // function to add user if it does not exist
    function addUser() {
        var app = new App(req.body);
        app.save(function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err });
            } else {
                res.status(200).send({
                    data: result
                });
            }
        });
    }

})

module.exports = router;