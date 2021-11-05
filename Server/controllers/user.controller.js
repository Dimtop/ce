const userModel = require("../models/user.model");
const machineModel = require("../models/machine.model")
const path = require("path")
const fs = require("fs")

var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: 'Z44ADUd1HbsAAAAAAAAAAZEteQWMCoJm5zOniIaajpRwjCenopvF5XV5Vz48vw5n' });
exports.authenticateUser = async(req,res)=>{
    
    var user = await userModel.findOne({username:req.body.username});
    console.log(req.body)
    if(!user){
        res.status(400).send({error:"Wrong username"});
        return
    }
    
    if(user.password!=req.body.password){
        res.status(401).send({error:"Wrong password"});
        return
    }

    res.status(200).send({success:"Successfull authentication.",data:{userID:user._id}})
}

exports.getUserMachines = async(req,res)=>{
    var machines = await machineModel.find({userID:req.params.userID});

    res.status(200).send({data:{machines:machines}})
}

exports.getUserByID = async(req,res)=>{
    var userID = req.params.userID;

    try{
        var user = await userModel.findOne({_id:userID})
    }
    catch(error){
        res.status(400).send({error:"There was an error"});
        return;
    }

    if(user){
        res.status(200).send({success:"O χρήστης βρέθηκε",data:{user:user}});
    }
}


exports.updateUser = async(req,res)=>{
    console.log(req.body.user)
    try{
        await userModel.updateOne({_id:req.params.userID},req.body.user);
    }
    catch(error){
        res.status(400).send({error:"Something went wrong."})
        return;
    }

    dbx.filesListFolder({path: '/My PC (LAPTOP-GT9MC1SQ)/documents'})
    .then(function(response) {
      console.log(response.result.entries);
    })
    
    .catch(function(error) {
      console.log(error);
    });


    dbx.filesUpload({path: '/My PC (LAPTOP-GT9MC1SQ)/documents/test.pdf', contents: fs.readFileSync(path.join(__dirname,"../test.pdf"))})
    .then(function(response) {
        console.log(response)
    })
    .catch(function(error) {
      console.error(error);
    });


    res.status(200).send({success:"The user was successfully updated."})
}