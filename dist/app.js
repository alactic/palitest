'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
require('./dbconnection');

var app = express();
var productRoutes = require('./api/routes/product');
var ordersRoutes = require('./api/routes/orders');
var userRoutes = require('./api/routes/user');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/user', userRoutes);

app.use(function (req, res, next) {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(function (error, req, res, next) {
    res.status(error.status || 500).json({ error: { message: error.message, message1: error.sendError } });
});

module.exports = app;