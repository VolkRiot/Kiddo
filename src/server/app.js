const express       = require('express'),
      path          = require('path'),
      favicon       = require('serve-favicon'),
      logger        = require('morgan'),
      cookieParser  = require('cookie-parser'),
      bodyParser    = require('body-parser');
      passport      = require('passport')

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


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
   //set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

   //render the error page
  res.status(err.status || 500);
  res.sendStatus(500);
});




module.exports = app;