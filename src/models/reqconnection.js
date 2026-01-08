const mongoose= require("mongoose")
const User= require("./user")
const reqconnection = new mongoose.Schema({
    fromuserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    touserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type : String,
        enum:{
            values:["interested","pending","accepted","rejected"],
            message:`{values} not found`
        }
    }
},
{
    timestamps:true
})

reqconnection.pre("save",function (next) {
    const reqconnection=this
    if(reqconnection.fromuserId.equals(reqconnection.touserId)){
        throw new Error("cannot send request to himself");
    }
    next();
})
const reqconnectionmongoosemodel = new mongoose.model("reqconnectionmongoosemodel",reqconnection)
module.exports= reqconnectionmongoosemodel 