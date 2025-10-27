const {mongoose}= require ("mongoose")

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
    }
},
{timestamps : true}
)
const User=mongoose.model("User",Userschema);

module.exports={
    User,
}