const validator = require('validator')

module.exports.signup = (username, password, email) => {
	const errors = {};
	if (username === ''){
		errors["username"] = "Username cannot be blank";
		}
	if (!validator.isEmail(email)){
		errors["email"] = "Not a valid email address";
		}
	if(email === ''){
		errors["email"] = "Email cannot be blank"
	}
	if(!validator.isAscii(password)){
		errors["password"] = "Not a valid password";	
		}
	if(!validator.isLength(password, {min:4, max: 12})){
		errors["password"] = "Ensure that your password has a minimum of 4 characters and maximum of 12 characters";	
	}
    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}


module.exports.newPasswordV = (password, thecPassword) => {
	const errors = {};
	if (password !== thecPassword){
		errors["password"] = "Password Mismatch";
		}
	if(!validator.isAscii(password)){
		errors["password"] = "Not a valid password";	
		}
	if(!validator.isLength(password, {min:4, max: 12})){
		errors["password"] = "Ensure that your password has a minimum of 4 char and maximum of 12 char";	
	}
    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}