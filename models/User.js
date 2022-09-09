const mongoose = require("mongoose");
const usertSchema = new mongoose.Schema({
    usertName: {
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
});

const User = mongoose.model("User", productSchema);
module.exports = User;