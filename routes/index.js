var express = require('express');
var router = express.Router();
var indexview  = require('../controllers/index')
const {hasAuth} = require('../middleware/hasAuth')

/* EVERYTHING GROUP ACCESS */
router.get('/groups', hasAuth, indexview.groups)
router.post('/group', hasAuth, indexview.group)
router.get('/group/:name/activate', hasAuth, indexview.activate_group)

//router.get('/group/:name', hasAuth, indexview.get_group)

module.exports = router;