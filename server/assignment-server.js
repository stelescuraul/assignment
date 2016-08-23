'use strict';
//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');


// =======================
// configuration =========
// =======================
var app = express();
var port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());

// cross origin options
var corsOptions = {
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['country', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-access-token', 'Access-Control-Allow-Origin']
};
app.use(cors(corsOptions));
app.options('*', cors());

//Routes
var main = require('./routes/v1/main');

// =======================
// routes ================
// =======================
app.use('/api', main);

// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development' || app.get('env') === 'test') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      name: err.name,
      message: err.message,
      error: {}
    });
  });
}

app.listen(port);
console.log('Listening on port: ' + port);
