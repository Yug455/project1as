const mongoose = require("mongoose")
const { required } = require("nodemon/lib/config")

const messageschema = new mongoose.Schema({
    senderID:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    text : {
        type : String
    }
},
{timestamps:true}
)

const chatschema =new mongoose.Schema({
 participants : [
    {
          type:mongoose.Schema.Types.ObjectId,
          ref:"User",
        // required: true add badme
    }
 ],
 messages:[messageschema]
})
const Chat = mongoose.model("Chat",chatschema)
module.exports= Chat