'use strict';

var mongoose = require('mongoose');
var Product = require('../models/product');

exports.get_all_products = function (req, res, next) {
    Product.find().exec().then(function (result) {
        res.status(200).json({
            count: result.length,
            products: result.map(function (result) {
                return {
                    _id: result._id,
                    name: result.name,
                    price: result.name,
                    productImage: result.productImage,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                };
            })
        });
    }).catch(function (error) {
        res.status(500).json({ error: error });
    });
};

exports.post_product = function (req, res, next) {
    var product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save().then(function (result) {
        res.status(201).json({
            message: 'Creation was successful',
            product: result
        });
    }).catch(function (error) {
        res.status(500).json({ error: error });
    });
};

exports.get_product_by_id = function (req, res, next) {
    var id = req.params.productId;
    Product.findById(id).select('name price _id productImage').exec().then(function (result) {
        res.status(200).json({ result: result });
    }).catch(function (error) {
        res.status(500).json({ error: error });
    });
};

exports.update_product = function (req, res, next) {
    var id = req.params.productId;
    var product = new Product({
        name: req.body.name,
        price: req.body.price
    });
    Product.findByIdAndUpdate(id, product).exec().then(function (result) {
        if (result) {
            res.status(200).json({ message: 'Update was successful', updated: result });
        } else {
            res.status(404).json({ message: 'Invalid id provided' });
        }
    }).catch(function (error) {
        res.status(500).json({ error: error });
    });
};

exports.delete_update = function (req, res, next) {
    Product.deleteOne({ _id: req.params.productId }).exec().then(function (result) {
        res.status(200).json({ message: 'Deletion was successful' });
    }).catch(function (error) {
        console.log('error :: ', error);
        res.status(500).json({ error: error });
    });
};