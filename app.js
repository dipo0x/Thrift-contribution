const express = require('express');
var app = express();
const {database} = require('./config')
var usersRouter = require('./routes/users');
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({secure: false, 
    maxAge: null,
    secret: 'esusu1234.',
    saveUninitialized: true,
    resave: false,
    cookie: {
      sameSite: true,
      maxAge: 950400000 // Time is in miliseconds, 11 days
      },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    })
  }));

app.use(passport.initialize());
app.use(passport.session());

database()
app.use('/', usersRouter);

app.listen(process.env.PORT);

module.exports = app;