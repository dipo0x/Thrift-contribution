var express = require('express');
var router = express.Router();
var indexview  = require('../controllers/index')

/* EVERYTHING GROUP ACCESS */
router.get('/group/:name', indexview.get_group)
router.post('/group', indexview.group)

module.exports = router;