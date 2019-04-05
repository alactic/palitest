'use strict';

var jwt = require('jsonwebtoken');
var expect = require('expect');
var request = require('supertest');
var mongoose = require('mongoose');
var app = require('../../app');

var User = require('../models/user');

var auth_token = 'Bearer ' + jwt.sign({
    email: 'email@gmail.com',
    _id: mongoose.Types.ObjectId()
}, process.env.JWT_TOKEN, { expiresIn: '1h' });
var users = [{
    _id: mongoose.Types.ObjectId(),
    email: 'email1@gmail.com',
    password: '12345'
}, {
    _id: mongoose.Types.ObjectId(),
    email: 'email2@gmail.com',
    password: '12345'
}];
beforeEach(function (done) {
    User.remove({}).then(function () {
        User.insertMany(users);
    }).then(function () {
        done();
    });
});

describe('User test for login, registration and forgot password', function () {
    describe('User test for registration', function () {
        it('should register a user', function (done) {
            var user = {
                _id: mongoose.Types.ObjectId(),
                email: 'email3@gmail.com',
                password: '12345'
            };
            request(app).post('/user/signup').send(user).expect(201).expect(function (res) {
                expect(res.body.result.email).toBe(user.email);
            }).end(function (err, result) {
                if (err) {
                    return done(err);
                }
                done();
            });
        });

        it('should login a user', function (done) {
            var user = {
                email: users[0]['email'],
                password: users[0]['password']
            };
            console.log('user :: ', user);
            request(app).post('/user/login').send(user).expect(200).expect(function (res) {
                // expect(res.body.result.email).toBe(user.email)
            }).end(function (err, result) {
                if (err) {
                    return done(err);
                }
                done();
            });
        });

        it('should get all users', function (done) {
            request(app).get('/user/findAll').expect(200).expect(function (res) {
                console.log('response :: ', res.body);
            }).end(function (err, result) {
                if (err) {
                    return done(err);
                }
                done();
            });
        });
    });
});