'use strict';

const express       = require('express'),
      path          = require('path'),
      favicon       = require('serve-favicon'),
      logger        = require('morgan'),
      cookieParser  = require('cookie-parser'),
      bodyParser    = require('body-parser'),
      session       = require('express-session'),
      passport      = require('passport');

const app = express();

// initialize DB
require('./db/mongodb');

app.use(cookieParser());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(path.join(__dirname, '../../public')));

app.use(session({
  secret: 'trixareforkids',
  resave: false,
  saveUninitialized: false,
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// importing routes
require('./passport/googleoauth.js')(passport); // pass passport for configuration
app.use('/', require('./routes/index'));

app.get('/test', (req, res) => {
  console.log("Req user is defined as ",req.user);
  res.json(req.user);
});

// catch 404 and forward to error handler
//app.use((req, res, next) => {
  //let err = new Error('Not Found');
  //err.status = 404;
  //next(err);
//});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
      message: 'Server Error',
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
