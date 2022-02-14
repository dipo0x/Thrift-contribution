var express = require('express');
var router = express.Router();
var usersview = require('../controllers/users')

/* EVERYTHING ACCOUNT ACCESS */
router.post('/register', usersview.register)

module.exports = router;