/**
 * Created by pnrisk on 11/21/2015 AD.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

var server;

var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());

mongoose.connect('mongodb://localhost:27017/beerlocker');

app.start = start;
app.stop = stop;

var index = require('./controllers/index');
app.use('/', index);

var beerCtrl = require('./controllers/beer');
app.use('/beers', beerCtrl);

var userstrl = require('./controllers/users');
app.use('/users', userstrl);

//app.listen(port);

function start(port, callback) {
    console.log('Starting server listening on port: ' + port);
    server = app.listen(port, callback);
}

function stop(callback) {
    server.close(callback);
}

module.exports = app;