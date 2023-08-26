const mongoose = require("mongoose");

const OtpSchema=new mongoose.Schema({
    code:{
        type:Number,
        requied:true,
        unique:true
    },
    phone:{
        type:Number,
        requied:true
    }
})

const Otps=mongoose.model("Otps",OtpSchema)
module.exports=Otps;