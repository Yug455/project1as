const express= require("express")
const userRouter = express.Router();
const {userauth}= require("../middelware/auth")
const User = require("../models/user")
const mongoose= require("mongoose")
const reqconnectionmongoosemodel  = require("../models/reqconnection")
module.exports= userRouter

userRouter.get("/user/request/recieved", userauth,async (req,res)=>{
    try{
        const Logginuser=req.user
           const pendingrequest = await reqconnectionmongoosemodel.find(
        {touserId:Logginuser._id,
         status : "interested"
        }
     ).populate(
        "fromuserId",
        "FirstName LastName Skills")
        res.json({
            pendingrequest,
            msg:"all intreasted request recieved "
        })
    }catch(err){
        return res.send(err.message)
    }
})
userRouter.get("/user/connections", userauth,async (req,res)=>{
    try{
        const Loggeduser= req.user 
        const getconnection = await reqconnectionmongoosemodel.find({
            $or:[
                {touserId:Loggeduser._id,status:"accepted"},
                {fromuserId:Loggeduser._id,status:"accepted"}
            ]
       
        }).populate("fromuserId",
            "FirstName LastName Skills" 
        ).populate("touserId",
            "FirstName LastName Skills" )
        const data = getconnection.map((row)=>{
            if (row.fromuserId._id.toString()==Loggeduser._id.toString()){
                return row.touserId
            }
            else{
                return row.fromuserId
            }
        })
        return res.json({data})
        }
    
    catch(err){
        res.send(err.message)
    }
})