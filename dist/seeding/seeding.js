'use strict';

var mongoose = require('mongoose');
require('../dbconnection');
var Product = require('../api/models/product');

var userData = [{
    _id: mongoose.Types.ObjectId(),
    name: 'toyota',
    price: 230000000,
    productImage: ''
}, {
    _id: mongoose.Types.ObjectId(),
    name: 'toyota2',
    price: 540000000,
    productImage: ''
}, {
    _id: mongoose.Types.ObjectId(),
    name: 'toyota3',
    price: 67000000,
    productImage: ''
}];

try {
    console.log('starting product seeding ...');
    Product.insertMany(userData).then(function (doc) {
        console.log('Product seeding completed.');
        console.log('Total products seeded is ' + doc.length);
    });
} catch (e) {
    console.log('error occured while seeding ', e);
}