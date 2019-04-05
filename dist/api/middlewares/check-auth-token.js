'use strict';

var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {
        token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.userdata = decoded;
        next();
    } catch (error) {
        return res.status(400).json({
            error: error
        });
    }
};