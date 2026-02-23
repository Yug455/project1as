
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
const chatrouter = require("./routes/chattingapi")
const cookieparser= require("cookie-parser")
  const {validatepostsignup} = require("./utils/utility")
// fpr corse error 
const cors = require('cors')
// using cors 
app.use(cors({
  origin: "http://localhost:5173",
  credentials : true,
}))
const initializesocket = require("./utils/socket")
// creating web socket server 
const http = require("http")
const server = http.createServer(app)
initializesocket(server)
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
app.use("/",chatrouter)
// connecting to db    
connectDB()
  .then(async() => {
    console.log("connected db successfully");
    server.listen(9000, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.error("database connection failed", err);
  });


