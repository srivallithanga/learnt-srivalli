var createError = require('http-errors');
var express = require('express');
const cors = require("cors");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require("mongoose");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/Products');
var authorRouter = require('./routes/authors');
const todoRoutes = require("./routes/todos"); 
const carRouter = require("./routes/carrental");
const bookRouter = require("./routes/book");
const categoryRouter = require("./routes/category");
const { connected } = require('process');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/authors', authorRouter); 
app.use("/todos", todoRoutes);
app.use("/carrental",carRouter);
app.use("/books",bookRouter);
app.use("/categories",categoryRouter);

app.get("/todoform", (req, res) => {
  const completePath = path.join(__dirname, "todoform.html");
  res.sendFile(completePath);
});
let mongoConnUrl="mongodb://localhost/ascendion";
mongoose.connect(mongoConnUrl);
let db=mongoose.connection;
db.on("error", function(){
  console.log("Error came in connecting");
});
db.on("connected", function(){
  console.log("Connected to mongoose Database named ascendion");
});

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
