const mongoose = require('mongoose')

var groupData= new mongoose.Schema({
	name: {
		type: String,
	},
	amount: {
		type: String,
	},
	admin: {
		type: String,
	},
	is_active:{
		type: String, default: "No"
	}
})
module.exports = mongoose.model('Group', groupData)