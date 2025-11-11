const express = require("express")
const { userauth } = require("../middelware/auth")
const { User } = require("../models/user")
const requestrouter = express.Router()

requestrouter.post("/sendconnectionrequest",userauth, async (req,res)=>{
    const user = req.user
    // sending a connection request 
    res.send(user.FirstName + "send the connection request ")
})
requestrouter.get("/feed",async (req,res)=>{
    try{
         const alluser= await User.find({})  
         res.send(alluser)
    }
    catch(err){
        res.status(400).send("something went wrong")
    }
})

requestrouter.get("/getuser", async (req,res)=>{
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
 requestrouter.delete("/deletesome",async(req,res)=>{
    const userdelete= req.body.UserId
    try{
        const tobedele= await User.findByIdAndDelete(userdelete)
        console.log(tobedele)
        res.send(tobedele)
    }catch(err){
      res.send("error occured",err)
    }
 })
 

module.exports= requestrouter