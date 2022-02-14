var express = require('express');
var router = express.Router();
var usersview = require('../controllers/users')

/* EVERYTHING ACCOUNT ACCESS */
router.get('/register', activeUser, usersview.get_register)
router.post('/register', activeUser, usersview.register)