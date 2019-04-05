'use strict';

var mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: { type: Number, required: true },
    productImage: { type: String }
});

module.exports = mongoose.model('Product', ProductSchema);