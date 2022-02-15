var express = require('express');
var router = express.Router();
var indexview  = require('../controllers/index')
const {hasAuth} = require('../middleware/hasAuth')

/* TO GET ALL THE GROUPS */
router.get('/groups', hasAuth, indexview.groups)

/* TO CREATE NEW GROUP */
router.post('/group', hasAuth, indexview.group)

/* TO JOIN A NEW GROUP & GROUP UNIQUE ID */
router.get('/group/join/:name', hasAuth, indexview.join_group)

/* TO ACTIVATE A NEW GROUP */
router.get('/group/:name/activate', hasAuth, indexview.activate_group)

/* TO PAY CONTRIBUTION TO A GROUP */
router.post('/group/:name/pay', hasAuth, indexview.pay_due)

/* TO GET GROUP DETAILS AS ADMIN */
router.get('/group/:name/admin', hasAuth, indexview.group_admin)


module.exports = router;