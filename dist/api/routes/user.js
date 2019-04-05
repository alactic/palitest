'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/signup', function (req, res, next) {
    User.findOne({ email: req.body.email }).exec().then(function (result) {
        if (result) {
            return res.status(409).json({ message: 'Email already exist' });
        }
    });
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) {
                return res.status(409).json({ error: err });
            }
            var user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
            user.save().then(function (result) {
                res.status(201).json({
                    result: result
                });
            }).catch(function (error) {
                res.status(500).json({ err: error });
            });
        });
    });
});

router.post('/login', function (req, res, next) {
    User.findOne({ email: req.body.email }).then(function (user) {
        if (!user) {
            return res.status(404).json({ message: 'Unauthorised User' });
        }
        bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (err) {
                res.status(422).json({ error: err });
            }
            if (result) {
                var payloads = { email: user.email, _id: user._id };
                return res.status(200).json({
                    payloads: payloads,
                    token: jwt.sign(payloads, process.env.JWT_TOKEN, { expiresIn: '1h' })
                });
            } else {
                return res.status(404).json({ message: 'Unauthorised User' });
            }
        });
    });
});

router.get('/findAll', function (req, res, next) {
    User.find().then(function (users) {
        res.status(200).json(users);
    });
});

module.exports = router;