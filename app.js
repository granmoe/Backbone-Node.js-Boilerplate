// DEPENDENCIES
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var api = require('./routes/api');
var mongoose = require('mongoose');

var app = express();

// SERVER CONFIGURATION
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('env', 'development');
app.set('port', process.env.PORT || 3000);


// API Methods
app.use('/api', api);
// express will use all the route methods in this file for anything off of /api

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
// production error handler
// no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

// app.get('/api', function(req, res) {
//   res.send('Library API is running');
// });

// START SERVER
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port
   + '\n http://localhost:3000');
});

