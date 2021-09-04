var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

//const bodyParser = require('body-parser');//
//const url = require('url');//
//const querystring = require('querystring');//


var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
let transactionsRouter = require('./routes/transactions')
let categoriesRouter = require('./routes/categories')
let balanceRouter = require('./routes/balance')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(bodyParser.json());//


let server = app.listen(3000, function() {
  console.log('Server is listening on port 3000')
});
app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/transactions', transactionsRouter)
app.use('/categories', categoriesRouter)
app.use('/balance', balanceRouter)

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

module.exports = app;
