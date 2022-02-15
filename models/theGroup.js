const mongoose = require('mongoose')

var userGroupData= new mongoose.Schema({
	username: {
		type: String,
	},
	group_name: {
		type: String,
	},
	amount: {
		type: Number,
    },
	remaining_balance:{
		type: Number
	},
	month_to_withdraw:{
		type: Number
	}
})
module.exports = mongoose.model('User Group Data', userGroupData)