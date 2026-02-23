const express = require("express")
const profilerouter = express.Router()
const {User}=require("../models/user")
const {userauth}=require("../middelware/auth")
const {  validatepostsignup,validateupdatingrequest}= require("../utils/utility")
profilerouter.get("/profile",userauth, async(req,res)=>{
 try{
  const user=req.user
  res.send(user)
  if (!user){
    res.status(401)
  }
 }catch(err){
  res.status(401).send(err.message)
 }
})
profilerouter.post("/updateuserinfo",userauth,async (req,res)=>{
    try{
        if(!validateupdatingrequest(req)) {
   }
    
    const logineduser= req.user
    console.log(req.body)

   
    Object.keys(req.body).forEach((keys)=>{
        logineduser[keys]= req.body[keys];
    })
    const editeduser= await logineduser.save();
   
   res.json({
    messsage:"yeahhhh user updated succesfully",
    data: editeduser.toObject()
   })
    }
   catch(err){
    res.send("error apperaed"+err.message)
   }

})
module.exports=profilerouter
