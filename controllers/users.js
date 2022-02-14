const { signup } = require('../utils/validator')
const userData = require('../models/user')
const bcryptjs = require('bcryptjs')
const passport = require('passport')
const Response = require("../utils/response.handler.js");

exports.register = async (req, res) => {
    console.log(req.body.email)
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
                        newUser.save().then(result=>{
                            passport.authenticate('local',{
                                successRedirect: '/profile',
                                failureRedirect: '/login',
                                failureFlash: true
                            })(req, res);
                        })
                    }}
            })}
        }
    })
}