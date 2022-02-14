const Response = require("../utils/response.handler.js");

exports.hasAuth = function(req, res, next){
    if(req.user){
            next();
        }
        else {
            return Response.send(
                res,
                200,
                "Please login to continue"
            );}
}