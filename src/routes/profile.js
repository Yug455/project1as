const express = require("express")
const profilerouter = express.Router()
const {User}=require("../models/user")
const {userauth}=require("../middelware/auth")
const {  validatepostsignup,validateupdatingrequest}= require("../utils/utility")
profilerouter.get("/profile",userauth, async(req,res)=>{
 try{
  const user=req.user
  res.send(`hello ${user.FirstName}`)
 }catch(err){
  res.send(err.message)
 }
})
profilerouter.post("/updateuserinfo",async (req,res)=>{
    try{
        if(!validateupdatingrequest(req)) {
   }
   else{
    console.log(req.body)

    const logineduser= req.user
    Object.keys(req.body).forEach((keys)=>{
        logineduser[keys]= req.body[keys];
    })
     await logineduser.save();
   }
   res.json({
    messsage:"yeahhhh user updated succesfully",
    data: logineduser.toObject()
   })
    }
   catch(err){
    res.send("error apperaed"+err.message)
   }

})
module.exports=profilerouter
