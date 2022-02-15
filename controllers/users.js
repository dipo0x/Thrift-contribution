const { signup } = require('../utils/validator')
const userData = require('../models/user')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;
const Response = require("../utils/response.handler.js");

/////////LOGIN AUTHENTICATION
passport.serializeUser(function(user, done){
	done(null, user.id)
})

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user)
	})
})

passport.use(new LocalStrategy(
  function(username, password, done) {
    userData.findOne({ username: username}, function (err, user) {
      if (err) { 
          return done(err); 
        }
      if (!user) { 
      	return done(null, false);
      }
      User.comparePassword(password, user.password, (err, isMatch)=>{
		if(err) throw err
		if(isMatch){
			return done(null, user)
		}else{
			return done(null, false, {message: 'Invalid Password'})
		        }
	        })
        });
    }
));

exports.register = async (req, res) => {
    const theUsername = req.body.username
    const theEmail = req.body.email
    const thePassword = req.body.password
    const newPassword = await bcryptjs.hash(thePassword, 10)
    const { errors, valid } = signup(theUsername, thePassword, theEmail);
    userData.findOne({username: theUsername}).then(user=>{
        if(user !== null){
            return Response.send(
                res,
                200,
                "Username already in use"
              );
        }
        else{
            if(!valid){
                return Response.send(
                    res,
                    200,
                    errors
                  );
            }
            else{
                userData.findOne({email: theEmail}).then(user=>{
                    if(user){
                        return Response.send(
                            res,
                            200,
                            "Email exists"
                          );
                    }
                    else{
                        const eSpace = theUsername.indexOf(' ') >= 0;
                        if (eSpace == true){
                            return Response.send(
                                res,
                                200,
                                "There's an extra space or y're using two words as your username"
                              );
                        }
                        else{
                        const newUser = new userData({
                            username: theUsername,
                            password: newPassword,
                            email: theEmail
                        })
                        newUser.save().then(()=>{
                            return Response.send(
                                res,
                                200,
                                "Registration successful"
                              );
                        })
                    }}
            })}
        }
    })
}

exports.login = function(req, res, next) {
    const username = req.body.username
    userData.findOne({ username: username}).then(user=>{
        if(user == null){
            return Response.send(
                res,
                200,
               'User not found'
              );
        }
        else{
            userData.comparePassword(req.body.password, user.password, (err, isMatch)=>{
                if(err) throw err
                if(isMatch){
                    passport.authenticate('local',{
                        successRedirect: '/profile',
                        failureRedirect: '/login',
                        failureFlash: true
                    })(req, res, next);
                }else{
                    return Response.send(
                        res,
                        200,
                        "Incorrect Password"
                      )}
                   }
                )
            }
        }
    )
}

exports.profile = function(req, res, next) {
    return Response.send(
        res,
        200,
        "You are logged in"
      )
}