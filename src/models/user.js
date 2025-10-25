const {mongoose}= require ("mongoose")

const Userschema= new mongoose.Schema({
    FirstName:{
        type:String,
    },
    LastName:{
        type:String,
    },
    EmailId:{
        type:String,
    },
    Password:{
        type:String,
    },
    Age:{
        type:Number,
    },
    Gender:{
        type:String,
    },
})
const User=mongoose.model("User",Userschema);

module.exports={
    User,
}