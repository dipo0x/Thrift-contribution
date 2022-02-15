const mongoose = require('mongoose')

var userGroupData= new mongoose.Schema({
	name: {
		type: String,
	},
	group_name: {
		type: String,
	},
	amount: {
		type: String,
    }
})
module.exports = mongoose.model('User Group Data', userGroupData)