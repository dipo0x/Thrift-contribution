const express = require('express');
const app = express();
require('dotenv').config()
const {database} = require('./config')
var usersRouter = require('./routes/users');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

database()
app.use('/', usersRouter);

app.listen(process.env.PORT);