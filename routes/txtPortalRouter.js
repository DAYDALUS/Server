'use strict'

var express = require('express'),
router = express.Router(),
cors = require('cors'),
expressSanitizer = require('express-sanitizer'),
user = require('../models/txtPortalModel.js');
var jwt = require('jsonwebtoken');
var key = "bGS6lzFqvvSQ8ALbOxatm7/Vk7mLQyzqaS34Q4oR1ew=";

// create new admin user
router.post("/save/dev",function(req,res){
    var User = new user(req.body);
    User.save(function(err,result){
        if (err){
            res.status(500).send({ error: err });
         }else{
         res.status(200).send({ data: result });
         }
    });
});
// login a admin user
router.post("/login",function(req,res){
    var data = req.body;
    user.findOne( { username: data.username } , function(err,user){
        if (err){
            res.status(500).send({ error: err });
            
        }else if( user == null){
            res.status(500).send({ error: "User does not Exist"});

        }else{
            user.comparePassword(data.password, function(err,isMatch){
                if(err){
                    res.status(500).send({ error: err });

                }else{
                    var token = jwt.sign({ username: data.username, password: user.password}, key, {expiresIn: "2 days"});
                    console.log(token);
                    res.status(200).send({ data: token});
                }
            })
         }
    });
});
// verify token
// verfiy if user exists and credentials match
router.post("/verifyToken",function(req,res){
    var token = req.body.token;
    // verify a token symmetric
    jwt.verify(token, key, function(err, decoded) {
        if(err){
            res.status(500).send({ error: err });
        }else{
            checkUser(decoded);
        }
    });

    function checkUser(data){
        user.findOne( { username: data.username } , function(err,user){
            if (err){
                res.status(500).send({ error: err });

            }else if( user == null){
                res.status(500).send({ error: "User does not Exist"});

            }else{
                console.log(data);
                user.comparePassword(data.password, function(err,isMatch){
                    if(err){
                        res.status(500).send({ error: "User does not Exist"});
                    }else{
                        res.status(200).send({ data: data.username});
                    }
                })
             }
        });
    }   
});


module.exports = router;