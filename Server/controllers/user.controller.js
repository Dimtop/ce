const userModel = require("../models/user.model");
const machineModel = require("../models/machine.model")

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