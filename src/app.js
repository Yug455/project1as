const express = require('express');

const app=express()
const {adminauth, userauth}=require("../auth/admin")
app.use("/admin",adminauth)
app.get("/admin/getdata",(req,res)=>{
    console.log("executed admin auth correctly")
    res.send("data send")
})
app.get("/user/:userid/:password",(req,res)=>{
    console.log(req.params)
   let useridd= req.params.userid
   console.log(`${useridd}`)
    res.end("this is a get request")
})
// app.get(/.*fly$/, (req, res) => {
//   res.send('This route ends with "fly"');
// });
app.get("/users",userauth,
  (req,res,)=>{
   let useridd=req.query.userid
    console.log(`${useridd}`)
    // next()
    res.send("thankyou for id2")
})
// app.get("/users",
//   (req,res, next)=>{
//    let useridd=req.query.userid
//     console.log(`${useridd}`)
//     next();
//     // res.send("thankyou for id ")
// })
app.post("/users",(req,res)=>{
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
