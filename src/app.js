// requiring express
const express = require('express');
// connecting to moongoose
const {connectDB}=require("./config/databse")
// initializing request 
const app=express()
// getting user model we have created in db
const {User}=require("./models/user")

// creating post route to add data in db manually 
app.post("/signup",async (req,res)=>{
     const user = new User({
        FirstName:"ramji",
        LastName: "shiva",
         EmailId: "shivji@gmail.com",
         Password:"2345"
    })

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

