const express = require('express');
const app = express();
require('dotenv').config()
const {database} = require('./config')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/', usersRouter);

app.listen(process.env.PORT);