const groupData = require('../models/group')
const Response = require("../utils/response.handler.js");

exports.group = async (req, res) => {
    const theName = req.body.name
    const thePrice = req.body.amount
    const theAdmin = req.user.username
    const theDescription = req.body.description
    const theMaximumC = req.body.maximum
    const searchable = req.body.searchable

    if(theName == '' || isNaN(thePrice) == true|| thePrice == ''){
        return Response.send(
            res,
            200,
            "Please check if Group Name or Price is blank and make sure that the price is an Interger"
        );
    }
    groupData.findOne({name: theName}).then(group=>{
        if(group !== null){
            return Response.send(
                res,
                200,
                "A group with that name already exixts"
              );
        }
        else{
           const newGroup = new groupData({
                name: theName,
                amount: thePrice,
                admin: theAdmin,
                description: theDescription,
                maximum_capacity: theMaximumC,
                searchable: searchable
            })
            newGroup.save().then(()=>{
                return Response.send(
                    res,
                    200,
                    "Group created successfully and you are the admin"
                );
            })
        }}
    )
}

exports.groups = async (req, res) => {
    groupData.find({}).then(groups=>{
        if(groups !== null){
                return Response.send(
                    res,
                    200,
                    groups
                );
        }
        else{
           cnewGroup.save().then(()=>{
                return Response.send(
                    res,
                    200,
                    "No group yet, why don't you create a group"
                    );
            })
        }}
    )
}

exports.join_group = async (req, res) => {
    const groupName = req.params.name
    groupData.findOne({name:groupName}).then(group=>{
        if(group){
            console.log(group)
            if(group.searchable == "Yes"){
                    return Response.send(
                        res,
                        200,
                        "Y've joined"
                    );
            }
            else{
                return Response.send(
                    res,
                    200,
                    "Sorry, this group can't allow participant in at the moment"
                );
            }}
            else{
                return Response.send(
                    res,
                    200,
                    `No group has ${groupName} as its name`
                );
            }
        })
}
