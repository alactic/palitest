'use strict';

var mongoose = require('mongoose');
var dbName = '';
if (process.env.NODE_ENV === 'development') {
    dbName = 'node-shop';
} else if (process.env.NODE_ENV === 'test') {
    dbName = 'node-shop-test';
}

mongoose.connect('mongodb://localhost:27017/' + dbName, { useMongoClient: true });
mongoose.Promise = global.Promise;