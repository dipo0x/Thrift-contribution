const mongoose = require('mongoose')

var groupData= new mongoose.Schema({
	name: {
		type: String,
	},
	amount: {
		type: Number,
	},
	admin: {
		type: String,
	},
	description: {
		type: String,
	},
	maximum_capacity: {
		type: Number,
	},
	searchable: {
		type: String,
	},
	is_active:{
		type: String, default: "No"
	}
})
module.exports = mongoose.model('Group', groupData)