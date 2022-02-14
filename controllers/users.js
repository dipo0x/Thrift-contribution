const { signup, newPasswordV, emailV } = require('../utils/validators')
const userData = require('../models/users')
const bcryptjs = require('bcryptjs')
const passport = require('passport')
const userData = require('../models/users')

exports.get_register = function(req, res, next) {
    res.render('user/register');
}

exports.register = async function(req, res, next) {
    const theUsername = req.body.username
    const theEmail = req.body.email
    const thePassword = req.body.password
    const newPassword = await bcryptjs.hash(thePassword, 10)
    const { errors, valid } = signup(theUsername, thePassword, theEmail);
    userData.findOne({username: theUsername}).then(user=>{
		const theErrors = {};
        if(user !== null){
            theErrors["username_exists"] = "Username already in use"
            username_register(req, res, theErrors);
        }
        else{
            if(!valid){
                rerender_register(req, res, errors);
            }
            else{
                userData.findOne({email: theEmail}).then(user=>{
                    if(user){
                        errors["email"] = "Email exists";
                        rerender_register(req, res, errors);
                    }
                    else{
                        const eSpace = theUsername.indexOf(' ') >= 0;
                        if (eSpace == true){
                            theErrors["username_exists"] = "There's an extra space or y're using two words as your username"
                            username_register(req, res, theErrors);
                        }
                        else{
                        const newUser = new userData({
                            username: theUsername,
                            password: newPassword,
                            email: theEmail
                        })
                        newUser.save().then(result=>{
                            passport.authenticate('local',{
                                successRedirect: '/profile',
                                failureRedirect: '/login',
                                failureFlash: true
                            })(req, res, next);
                        })
                    }}
            })}
        }
    })
}