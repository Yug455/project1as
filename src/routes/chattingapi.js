const express = require("express")
const { userauth } = require("../middelware/auth")
const Chat = require("../models/chat")
const chatrouter = express.Router()
chatrouter.get("/getchat/:targetuserId",userauth,async(req,res)=>{
 const user = req?.user
 const userId = user?._id
 const {targetuserId}= req?.params
 console.log("userId:", userId)
console.log("targetuserId:", targetuserId)
 let chat = await Chat.findOne({
    participants:{$all:[userId,targetuserId]}// add targetuserID after testing
 }).populate({
    path: "messages.senderID",
    select:"FirstName LastName",
 }
 )
 if(!chat){
    chat = new Chat({
        participants:[userId,targetuserId],
        messages:[],
    })
 }
chat = await chat.save();
res.json({chat})
})
module.exports= chatrouter