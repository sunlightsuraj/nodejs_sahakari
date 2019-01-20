var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userLoginsRouter = require('./routes/userLogins');
var eventsRouter = require('./routes/events');
var savingsRouter = require('./routes/savings');
var savingwithdrawsRouter = require('./routes/savingwithdraws');
var membermoneylogsRouter = require('./routes/membermoneylogs');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user-logins', userLoginsRouter);
app.use('/events', eventsRouter);
app.use('/savings', savingsRouter);
app.use('/savingwithdraws', savingwithdrawsRouter);
app.use('/membermoneylogs', membermoneylogsRouter);

module.exports = app;
