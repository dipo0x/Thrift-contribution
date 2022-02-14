const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

var userData= new mongoose.Schema({
	username: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	
})
module.exports = mongoose.model('User', userData)

module.exports.comparePassword = (candidatePassword, hash, callback)=>{
	bcryptjs.compare(candidatePassword, hash, (err, isMatch)=>{
		if(err) return callback(err)
		callback(null, isMatch)
	})
}