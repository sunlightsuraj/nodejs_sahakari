var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userLoginsRouter = require('./routes/userLogins');
var eventsRouter = require('./routes/events');
var eventcollectionsRouter = require('./routes/eventcollections');

var loansRouter = require('./routes/loans');
var loan_installment_calculationsRouter = require('./routes/loan_installment_calculations');
var user_typesRouter = require('./routes/user_types');
var document_typesRouter = require('./routes/document_types');
var savingsRouter = require('./routes/savings');
var savingwithdrawsRouter = require('./routes/savingwithdraws');
var membermoneylogsRouter = require('./routes/membermoneylogs');
var userdocumentsRouter = require('./routes/user_documents');
var userdocumentfilesRouter = require('./routes/user_document_files');
var usersRouter = require('./routes/users');
 var userLoginRouter = require('./routes/userLogins');
 var loan_paymentsRouter = require('./routes/loan_payments');



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/events', eventsRouter);
app.use('/eventcollections', eventcollectionsRouter);
app.use('/loans', loansRouter);
app.use('/loan_installment_calculations', loan_installment_calculationsRouter);

app.use('/user_types', user_typesRouter);
app.use('/document_types', document_typesRouter);
app.use('/savings', savingsRouter);
app.use('/savingwithdraws', savingwithdrawsRouter);
app.use('/membermoneylogs', membermoneylogsRouter);
app.use('/user-document-files',userdocumentfilesRouter);
app.use('/user-documents',userdocumentsRouter);
app.use('/user', usersRouter);
app.use('/userlogin', userLoginsRouter);
app.use('/loan_payments', loan_paymentsRouter);


module.exports = app;
