const express = require("express")
const  {userauth}  = require("../middelware/auth")
const { User } = require("../models/user")
const requestrouter = express.Router()
const reqconnectionmongoose= require("../models/reqconnection")
const moongoose = require("mongoose")
requestrouter.post("/sendconnectionrequest/:status/:id",userauth, async (req,res)=>{
    try{
          const fromuserId= req.user._id
    const touserId= req.params.id
    const status = req.params.status
    
   const allowedstatus=["interested","ignored"]
   const isvalid=allowedstatus.includes(status)
        if(!isvalid){
           throw new Error("not a valid status")
        }

    const connectionrequest = await User.findOne({
        $or:[
            {fromuserId,touserId},
            {fromuserId:touserId,touserId:fromuserId}
        ]
    })
    if(connectionrequest){
       throw new Error("invalid user")
    }
    const isuserthere= await User.findById(touserId)
    if(!isuserthere){
        throw new Error("user not here in db")
    }
    const connectionreq= new reqconnectionmongoose({
        fromuserId,
        touserId,
        status
    })
    const data= await connectionreq.save()
    res.json({
        data,
        message:"connection request send succesfully"
    })
    }
  catch(err){
    res.send(err.message)
         
    
  }
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

 requestrouter.post("/request/review/:status/:requestId", userauth ,async(req,res)=>{
    try{
         const LoggedinUser = req.user
    const {status,requestId}=req.params
    const allowedstatus=["accepted","rejected"]

    if (!allowedstatus.includes(status)){
        throw new Error("not valid status")
    }
    const connectionreq= await reqconnectionmongoose.findOne({
       _id:requestId ,
        touserId:LoggedinUser._id,
        status:"interested",
    })
    if (!connectionreq){
        throw new Error("invalid request didnt found")
    }
    connectionreq.status = status
    const data= await connectionreq.save()

    res.status(200)
    .json({
        msg:"user updated succesfully",
        data,
    })
    }
    catch(err){
        res.send(err.message)
    }
   
 }) 

module.exports= requestrouter