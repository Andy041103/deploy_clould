require('dotenv').config()


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



var app = express();


let message = '';

app.use((req, res, next) => {
    res.locals.message = message;
    message = ''; // Reset thông báo sau khi truyền
    next();
}); 
const hbs = require('handlebars');



app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());

// Swagger options






//Routes 
const categories = require('./routes/catgoties');
app.use('/categories', categories);
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);
const index = require('./routes/index');
app.use('/', index)
//conect database
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_DELOY)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });


  
  
  


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const adminRouter = require('./routes/admin');
app.use('/', adminRouter);

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
