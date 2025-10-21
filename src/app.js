const express = require('express');

const app=express()
app.use("/hum",(req,res)=>{
 res.end("hi")
})
app.use("/test",(req,res)=>{
 res.end("hello world")
})
app.use("/hello",(req,res)=>{
    res.end("my name is yug")
})




app.listen(9000,(req,res)=>{
 console.log("server started")
})
