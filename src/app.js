
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
// creating post route to add data in db manually 
app.post("/signup",async (req,res)=>{
    console.log(req.body)

     const user = new User(req.body)

   try{
    await user.save()
    res.send("user creates succesfully")
   }
   catch(err){
    res.status(400).send("error occures"+err)
   }
    // saving 
    
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
  
 app.patch("/updateuser",async(req,res)=>{
  const userinfo =req.body.EmailId
  const userName=req.body.FirstName
  if(!userinfo){
    res.send("error user email not founf")
  }
  else{
    try{
     const changes= await User.findOneAndUpdate({EmailId:userinfo},{FirstName:userName})
     res.send(changes)
  }catch(err){
    res.status(500).send(err)
  }
  }

 })

// connecting to db    
connectDB()
  .then(() => {
    console.log("connected db successfully");
    app.listen(9000, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.error("database connection failed", err);
  });


