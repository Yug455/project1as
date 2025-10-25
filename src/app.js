// requiring express
const express = require('express');
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
    res.status(400).send("error occures"+err.message)
   }
    // saving 
    
})

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

