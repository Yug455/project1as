const express= require("express")
const userRouter = express.Router();
const {userauth}= require("../middelware/auth")
const {User} = require("../models/user")
const mongoose= require("mongoose")
const reqconnectionmongoosemodel  = require("../models/reqconnection")
module.exports= userRouter

userRouter.get("/user/request/recieved", userauth,async (req,res)=>{
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
userRouter.get("/feedapi",userauth,async(req,res)=>{
   const Logginuser = req.user
   const page = (req.query.page) || 1
   let limit=(req.query.limit) || 10
   const skip = ((page-1)*limit)
    if(limit>50){
        limit = 50;
    }
    let connection =await reqconnectionmongoosemodel.find({
        $or:[
            {fromuserId : Logginuser._id},
            {touserId : Logginuser._id}
        ]
    }).select("fromuserId touserId")
    const hiddenuser = new Set()
     connection.forEach((req)=>{
        hiddenuser.add(req.fromuserId.toString())
        hiddenuser.add(req.touserId.toString())
     })
     const userinfeed = await User.find({
        $and: [
           { _id :{$nin : Array.from(hiddenuser)}} ,
            {_id : {$ne : Logginuser._id}}
        ]
        
     }).select()
     .skip(skip)
     .limit(limit)
    res.json(userinfeed)
})