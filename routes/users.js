var express = require('express');
var router = express.Router();
var usersview = require('../controllers/users')
const {hasAuth} = require('../middleware/hasAuth')

/* EVERYTHING ACCOUNT ACCESS */
router.post('/register', usersview.register)
router.post('/login', usersview.login)

/* EVERYTHING USER ACCESS */
router.get('/profile', usersview.profile)

module.exports = router;