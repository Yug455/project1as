const express = require("express")
const profilerouter = express.Router()
const {User}=require("../models/user")
const {userauth}=require("../middelware/auth")
profilerouter.get("/profile",userauth, async(req,res)=>{
 try{
  const user=req.user
  res.send(`hello ${user.FirstName}`)
 }catch(err){
  res.send(err.message)
 }
})
module.exports=profilerouter
