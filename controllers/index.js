const groupData = require('../models/group')
const userGroupData = require('../models/theGroup')
const Response = require("../utils/response.handler.js");

exports.group = async (req, res) => {
    const theName = req.body.name
    const thePrice = req.body.amount
    const theAdmin = req.user.username
    const theDescription = req.body.description
    const theMaximumC = req.body.maximum
    const searchable = req.body.searchable

    /* TO CHECK IF ANY INPUT IS EMPTY */
    if(theName == '' || isNaN(thePrice) == true|| thePrice == ''){
        return Response.send(
            res,
            200,
            "Please check if Group Name or Price is blank and make sure that the price is an Interger"
        );
    }
    /* TO CHECK IF A GROUP WITH THE INPUTED NAME HAS BEEN CREATED */
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
    /* TO GET ALL THE GROUPS */
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
            groupData.findOne({username:req.user.username}).then(group=>{
                /* TO CHECK IF THE USER IS ALREADY IN THE GROUP */
                if(group){
                    return Response.send(
                        res,
                        200,
                        `You are already in this group`
                    )}
            else{
                const month = Math.ceil(Math.random() * 12)
                if(group.searchable == "Yes"){
                    if(group.is_active == "No"){
                        /* TO CHECK IF THE GROUP CONTRIBUTION HAS STARTED */
                    const userGroupDetails = new userGroupData({
                        name: req.user.username,
                        group_name: groupName,
                        amount: 0,
                        remaining_balance: group.amount,
                        month_to_withdraw: month
                    })
                    userGroupDetails.save()
                        return Response.send(
                            res,
                            200,
                            `You have joined ${groupName} group.`
                        )}
                        else{
                            /* THIS IS TO ADD THE USER TO THE BOTTOM OF THE GROUP LIST */
                            userGroupData.find({name: groupName}).then(result=>{
                                const userGroupDetails = new userGroupData({
                                    name: req.user.username,
                                    group_name: groupName,
                                    amount: 0,
                                    remaining_balance: group.amount,
                                    month_to_withdraw: result.length+1
                                })
                                userGroupDetails.save()
                                    return Response.send(
                                        res,
                                        200,
                                        `You have joined ${groupName} group.`
                                    )
                                })
                            }
                        }
                        
            else{
                return Response.send(
                    res,
                    200,
                    "Sorry, this group can't allow participant in at the moment"
                );
            }}
        })}
            else{
                return Response.send(
                    res,
                    200,
                    `No group has ${groupName} as its name`
                );
            }
        })
}