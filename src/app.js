// requiring express
const express = require('express');
// connecting to moongoose
const {connectDB}=require("./config/databse")
// initializing request 
const app=express()
// connecting to db    
connectDB().then(()=>{
    console.log("connected db succsesfully")
    app.listen(9000,(req,res)=>{
    console.log("server started") 
})
}).catch(()=>{
    console.log("an error occured")
})
// opening port 

