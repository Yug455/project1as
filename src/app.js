const express = require('express');

const app=express()

app.get("/user/:userid/:password",(req,res)=>{
    console.log(req.params)
   let useridd= req.params.userid
   console.log(`${useridd}`)
    res.end("this is a get request")
})
// app.get(/.*fly$/, (req, res) => {
//   res.send('This route ends with "fly"');
// });
app.get("/users",
  [  (req,res, next)=>{
   let useridd=req.query.userid
    console.log(`${useridd}`)
    next();
    // res.send("thankyou for id ")
}
 ,(req,res,next)=>{
   let useridd=req.query.userid
    console.log(`${useridd}`)
    next();
    // res.send("thankyou for id 2 here ")
}]
 ,(req,res,)=>{
   let useridd=req.query.userid
    console.log(`${useridd}`)
    res.send("thankyou for id 3 here and here ")
}
)

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
