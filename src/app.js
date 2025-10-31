
// requiring express
const express = require('express');
// reqiring moongoose
   const mongoose = require("mongoose");
// connecting to moongoose
const {connectDB}=require("./config/databse")
// initializing request 
const app=express()
// getting user model we have created in db
const {User}=require("./models/user")
// adding middleware for covertion javascript object
app.use(express.json())
// requiring bcrypt for password 
const bcrypt= require("bcrypt")
// validating function 
  const {validatepostsignup} = require("./utils/utility")
// creating post route to add data in db manually 
app.post("/signup",async (req,res)=>{
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
      await user.save()
    res.send("user creates succesfully")
   }
   catch(err){
    res.status(400).send("error occures"+err)
   } 
})
app.get("/feed",async (req,res)=>{
    try{
         const alluser= await User.f    
         res.send(alluser)
    }
    catch(err){
        res.status(400).send("something went wrong")
    }
})
app.post("/login", async (req, res) => {
  try {
    const { EmailId, Password } = req.body;
    const user = await User.findOne({ EmailId });

    if (!user) {
       res.status(400).send("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      res.send("Invalid credentials");
    } 
    else{
       res.send("User logged in successfully");
    }
    
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.get("/getuser", async (req,res)=>{
    const useremail=req.body.EmailId
    console.log(useremail)
    if(!useremail){
     res.status(404).send("no user found")
    }
    else{
             try{                                                                                      // will only retun name age by this 
         const userbyemail= await User.find({EmailId:useremail, Password:"mai nahi bataunga"},"FirstName, Age")
         // not workin understand it later channing 
        //  userbyemail.find({age:{$gt:15}})
        
         console.log(userbyemail)
         res.send(userbyemail)
    }catch(err){
        res.status(400).send("an error occured")
    }
    }

})
 app.delete("/deletesome",async(req,res)=>{
    const userdelete= req.body.UserId
    try{
        const tobedele= await User.findByIdAndDelete(userdelete)
        console.log(tobedele)
        res.send(tobedele)
    }catch(err){
      res.send("error occured",err)
    }
 })
  
 app.patch("/updateuser/:UserId",async(req,res)=>{
  
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

// connecting to db    
connectDB()
  .then(async() => {
    console.log("connected db successfully");
    app.listen(9000, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.error("database connection failed", err);
  });


