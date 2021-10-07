const mongoose = require('mongoose');

//Here we define the User Model


const machineSchema = new mongoose.Schema({

    name:{
        type:String
    },
    type:{
        type:String
    },
    categories:[],
    userID:{
        type:String
    }
  
});


module.exports = mongoose.model("Machine",machineSchema, "Machines");