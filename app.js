var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userLoginsRouter = require('./routes/userLogins');
var eventsRouter = require('./routes/events');
var user_typesRouter = require('./routes/user_types');
var document_typesRouter = require('./routes/document_types');

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
app.use('/user_types', user_typesRouter);
app.use('/document_types', document_typesRouter);

module.exports = app;
