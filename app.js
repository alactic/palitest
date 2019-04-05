const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const mealRoutes = require('./api/routes/meal');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method ==='OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*');
        return res.status(200).json({});
    }
    next();
});

app.use('/', (req, res) => {
    res.send('Welcome to Pali Labs.  kindly make you request')
});
app.use(function(req, res, next) {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(function (error, req, res, next) {
    res.status(error.status || 500).json({error: {message: error.message, message1: error.sendError}});
});

module.exports = app;