const express = require("express")
const {User}=require("../models/user")
const authrouter = express.Router()
const mongoose = require("mongoose")
const jwt=require("jsonwebtoken")
const bcrypt= require("bcrypt")
const {userauth}=require("../middelware/auth")
const {validatepostsignup} = require("../utils/utility")

authrouter.post("/signup",async (req,res)=>{
  const {FirstName,LastName,Age,EmailId,Password} = req.body
    console.log(req.body)

// code 
   try{
     // validate function 
    validatepostsignup(req)
   // encryting coming password 
   const PasswordHash =await bcrypt.hash(Password,10)
    const user = new User({
      FirstName,
      LastName,
      Age,
      EmailId,
      Password:PasswordHash,
    })
      const saveuser=await user.save()

    const token =await saveuser.getJwt();
    res.cookie("token", token ,{

      expires : new Date(Date.now()+ 8 * 3600000)
    })

    res.json({message: "user created sucessfulyy",
      data:saveuser
    })

   }
   catch(err){
    res.status(400).send("error occures"+err)
   } 
})
authrouter.post("/login", async (req, res) => {
  try {
    const { EmailId, Password } = req.body;
    const user = await User.findOne({ EmailId });

     if (!user) {
      // send proper error for frontend
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.validatePassword(Password)
    if (isMatch) {
      // creating jwt token 
      const token = await user.getJwt()
      // creating cookie 
      res.cookie("token",token)
      res.json({user})
    } 
  else {
    res.status(400).json({ message: "Invalid credentials" });
  }
    
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
 authrouter.patch("/updateuser/:UserId",async(req,res)=>{
  
  const data = req.body
  const Id=req.params.UserId

  if(!Id){
    res.status(400).send("error user email not found")
  }
  if(data?.Skills.length>10){
    throw new Error("skiils more than 10 not valid")
  }
  else{
    try{
      // definig what can be updated 
      const Updates=["FirstName","Gender","Skills","Age","Password"]
      const WhatShould= Object.keys(data).every((k)=>Updates.includes(k))
      if(!WhatShould){
        throw new Error("cannot be changes")
      }
     const changes= await User.findOneAndUpdate({_id:Id}, data,
      {returnDocument:"after",
        runValidators:true,
      })
     res.send(changes)
  }catch(err){
    res.status(500).send(err.message)
  }
  }
 
 })
authrouter.post("/logout",(req,res)=>{
  res.cookie("Token",null,{
    expires: new Date(Date.now())
  })
  res.send("logout succesfully")
})
module.exports={
    authrouter,
}