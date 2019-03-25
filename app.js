var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var fileStreamRotator = require('file-stream-rotator');
//解决跨域
var CORS = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//解决跨域
app.use(CORS());


//写日志
//日志记录

var logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = fileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

//制作自定义token
logger.token('ips',function(req, res) {
  return req.ip||'-';
})

logger.token('from',function(req, res) {
  return req.query.from||'-';
})
//制作自定义日志格式
logger.format('gsluo','[gsluo] :method :url :status :res[content-length] - :response-time ms  :ips :from');
//  解决跨域问题
app.use(cors());
// 写日志
// app.use(logger('dev'));
app.use(logger('gsluo',{stream: accessLogStream}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//接口路径
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
