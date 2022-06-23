var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var compteRouter = require('./routes/compte');
var parksRouter = require('./routes/parks');
var reservationRouter = require('./routes/reservation');
var horaireRouter = require('./routes/horaire');
var associerRouter = require('./routes/Associer');
var avoirRouter = require('./routes/avoir');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/compte', compteRouter);
app.use('/parking', parksRouter)
app.use('/horaire', horaireRouter)
app.use('/reservation', reservationRouter)
app.use('/associer', associerRouter)
app.use('/avoir', avoirRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(3000, () => console.log("Server running on port 3000 ..."));

module.exports = app;
