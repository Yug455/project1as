const mongoose= require("mongoose");
const validator = require("validator");

const Userschema= new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
        minlength:4,
    },
    LastName:{
        type:String,
    },
    EmailId:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("give a valid email")
            }
        }
    },
    Password:{
        type:String,
        required:true,
    },
    Age:{
        type:Number,
        min : 18,
        default: 18
    },
    Gender:{
        type:String,
        // validate(value){
        //     if(!["Female","Male","Others"].includes(value)){
        //         throw new Error("invalid gender")
        //     }
        // }
         enum: ["Male", "Female", "Others"],
    },
    Skills :{
        type : [String],
        validate(key){
           return key.length<=10
        }
    }
},
{timestamps : true}
)
const User=mongoose.model("User",Userschema);

module.exports={
    User,
}