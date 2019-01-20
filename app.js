var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userLoginsRouter = require('./routes/userLogins');
var eventsRouter = require('./routes/events');
var loansRouter = require('./routes/loans');
var loan_installment_calculationsRouter = require('./routes/loan_installment_calculations');

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
app.use('/loans', loansRouter);
app.use('/loan_installment_calculations', loan_installment_calculationsRouter);

module.exports = app;
