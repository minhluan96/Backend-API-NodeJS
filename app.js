'use strict';

var express = require('express');
var app = express();
var jsonParser = require('body-parser').json;
var route = require('./route');
var logger = require('morgan');
var mongoose = require('mongoose');

app.use(jsonParser());


mongoose.connect('mongodb://localhost:27017/qa');
var db = mongoose.connection;

app.use(logger("dev"));
app.use("/questions", route);

db.on('error', function(err) {
    console.log("Connection error: ", err);
});

db.once('open', function() {
    console.log('db connection successful');
});

//accross domain access api
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE");
        return res.status(200).json({});
    }
    next();
})

//catch error
app.use(function(req, res, next) {
    var err = new Error("Not found");
    err.status = 404;
    next(err);
});

//error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
})

app.use(function(req, res, next) {
    if(req.body) {
        console.log();
    }
    next();
});


var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("Express server is listening on port", port);
});