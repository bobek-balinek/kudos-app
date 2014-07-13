var express = require('express');
var router = express.Router();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var kudosService = require('./lib/kudos');
var app = express();

app.use('/', router);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.all('*', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

/* GET home page. */
router.get('/', function(req, res) {
    res.json({
        path: req.query.path,
        count: kudosService.getCount(req.query.path)
    });
});

/* POST statistics. */
router.post('/', function(req, res) {
    kudosService.updateCount(req.query.path, function(err, counter){
        res.json({
            path: req.query.path,
            count: counter
        });
    });
});

module.exports = app;
