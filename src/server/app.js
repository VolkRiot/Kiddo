const express       = require('express'),
      path          = require('path'),
      favicon       = require('serve-favicon'),
      logger        = require('morgan'),
      cookieParser  = require('cookie-parser'),
      bodyParser    = require('body-parser'),
      passport      = require('passport');
const app = express();

// initialize DB
require('./db/mongodb');

//initialize passport
require('./passport/googleoauth.js')(passport); //pass passport for configuration
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


/*app.set('view engine', 'html');*/
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(path.join(__dirname, '../../public')));


// importing routes
app.use('/', require('./routes/index'));
<<<<<<< HEAD


// catch 404 and forward to error handler
app.use((req, res, next) => {
=======
app.use('/api', require('./routes/api'));

// catch 404 and forward to error handler
app.use((req, res, next)=> {
>>>>>>> Merged with Master on Remote Branch and recommiting my changes from original commit
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

<<<<<<< HEAD
// error handler
app.use((err, req, res, next) => {
  let status;

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // sending the error page
  console.error(err);
  status = err.status || 500;
  res.status(status).json({status: status, message: err.message});
=======
// error handlers

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
>>>>>>> Merged with Master on Remote Branch and recommiting my changes from original commit
});



module.exports = app;