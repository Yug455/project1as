const express = require('express');

const app=express()
app.use("/user",(req,res)=>{
    res.end("others will not get a chance to enter")
})
app.get("/user",(req,res)=>{
    res.end("this is a get request")
})
app.post("/user",(req,res)=>{
    res.end("congratulation user you have posted something")
})
app.patch("/user",(req,res)=>{
    res.end("congratulations user you have patch a small part")
})
app.delete("/user",(req,res)=>{
    res.end("congratulations user you have deleted you")
})


app.listen(9000,(req,res)=>{
 console.log("server started")
})
