'use strict';

var mongoose = require('mongoose');
var Order = require('../models/order');

exports.all_orders = function (req, res, next) {
    Order.find().populate('product', 'name').exec().then(function (result) {
        res.status(200).json({
            count: result.length,
            orders: result.map(function (result) {
                return {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity,
                    request: {
                        type: 'GET',
                        url: 'http:/' + '/localhost:3000/orders/' + result._id
                    }
                };
            })
        });
    }).catch(function (error) {
        res.status(500).json({ error: error });
    });
};

exports.post_order = function (req, res, next) {
    var order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.product,
        quantity: req.body.quantity
    });
    order.save().then(function (result) {
        res.status(201).json({
            message: 'Creation was successful',
            order: result
        });
    }).catch(function (error) {
        res.status(400).json({ error: error });
    });
};

exports.get_order_by_id = function (req, res, next) {
    var id = req.params.orderId;
    Order.findById(id).select('product quantity _id').populate('product').exec().then(function (result) {
        res.status(200).json({ result: result });
    }).catch(function (error) {
        res.status(500).json({ error: error });
    });
};

exports.update_order = function (req, res, next) {
    var id = req.params.orderId;
    var order = new Order({
        product: req.body.product,
        quantity: req.body.quantity
    });
    Order.findByIdAndUpdate(id, order).exec().then(function (result) {
        if (result) {
            res.status(200).json({ message: 'Update was successful', updated: {
                    product: req.body.product,
                    quantity: req.body.quantity
                } });
        } else {
            res.status(404).json({ message: 'Invalid id provided' });
        }
    }).catch(function (error) {
        res.status(500).json({ error: error });
    });
};

exports.delete_order = function (req, res, next) {
    Order.deleteOne({ _id: req.params.orderId }).exec().then(function (result) {
        res.status(200).json({ message: 'Deletion was successful' });
    }).catch(function (error) {
        res.status(500).json({ error: error });
    });
};