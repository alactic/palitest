'use strict';

var jwt = require('jsonwebtoken');
var expect = require('expect');
var request = require('supertest');
var mongoose = require('mongoose');
var app = require('../../app');

var Order = require('../models/order');

var auth_token = 'Bearer ' + jwt.sign({ email: 'email@gmail.com', _id: mongoose.Types.ObjectId() }, process.env.JWT_TOKEN, { expiresIn: '1h' });
var orders = [{
    _id: mongoose.Types.ObjectId(),
    product: mongoose.Types.ObjectId(),
    quantity: 23
}, {
    _id: mongoose.Types.ObjectId(),
    product: mongoose.Types.ObjectId(),
    quantity: 45
}];
beforeEach(function (done) {
    Order.remove({}).then(function () {
        Order.insertMany(orders);
        done();
    });
});
describe('Testing order api endpoints (CREATE READ UPDATE AND DELETE)', function () {
    it('should create a new order', function (done) {
        var order = {
            _id: mongoose.Types.ObjectId(),
            product: mongoose.Types.ObjectId(),
            quantity: 23
        };
        request(app).post('/orders').set('authorization', auth_token).send(order).expect(201).expect(function (res) {
            expect(res.body.order.quantity).toBe(order.quantity);
        }).end(function (error, result) {
            if (error) {
                return done(error);
            }
            Order.find().exec().then(function (res) {
                expect(res.length).toBe(3);
                expect(res[0].quantity).toBe(order.quantity);
                done();
            }).catch(function (e) {
                done(e);
            });
        });
    });

    it('should accept wrong data', function (done) {
        request(app).post('/orders').set('authorization', auth_token).send({}).expect(400).end(function (err, res) {
            if (err) {
                return done(err);
            }
        });
        done();
    });

    it('should get all orders', function (done) {
        request(app).get('/orders').set('authorization', auth_token).expect(200).expect(function (res) {
            expect(res.body.orders.length).toBe(2);
        }).end(function (err, res) {
            if (err) {
                return done(err);
            }
            done();
        });
    });

    it('should get order by id', function (done) {
        request(app).get('/orders/' + orders[0]['_id']).set('authorization', auth_token).expect(200).expect(function (res) {
            expect(res.body.result.quantity).toBe(orders[0]['quantity']);
        }).end(function (err, succ) {
            if (err) {
                return done(err);
            }
            done();
        });
    });
});