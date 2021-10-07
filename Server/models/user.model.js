const mongoose = require('mongoose');

//Here we define the User Model


const userSchema = new mongoose.Schema({

    username: {
        type:String,
        required:[true,"The username is required."]
    },
    password: {
        type:String,
        required:[true,"The password is required."]
    }
  
});


module.exports = mongoose.model("User",userSchema, "Users");