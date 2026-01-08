
// requiring express
const express = require('express');
// reqiring moongoose
   const mongoose = require("mongoose");
// connecting to moongoose
const {connectDB}=require("./config/databse")
// initializing request 
const app=express()
// getting user model we have created in db
const User=require("./models/user")
// adding middleware for covertion javascript object
app.use(express.json())
// getting cookie parser
const cookieparser= require("cookie-parser")
  const {validatepostsignup} = require("./utils/utility")

  app.use(cookieparser())
// creating post route to add data in db manually 
const {authrouter}= require("./routes/authtentication")
const profilerouter= require("./routes/profile")
const requestrouter = require("./routes/userrequest")
const userRouter= require("./routes/user")
app.use("/",authrouter)
app.use("/",profilerouter)
app.use("/",requestrouter)
app.use("/",userRouter)
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


