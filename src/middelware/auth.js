const jwt = require("jsonwebtoken")
const { User } = require("../models/user")

const userauth = async(req,res,next)=>{
   try{
     // getting cookie 
    const cookie = req.cookies
    const {Token}=cookie
    // settin jwt cookie 
    const decoder= await jwt.verify(Token,"Develper!23")
    if(!decoder){
       return res.send("Invalid token")
    }
    // getting user 
    const {_id}=decoder
    if(!_id){
        return res.send("Invalid id")
    }
    const user = await User.findById(_id)
    if(!user){
        return res.send("Invalid UserId")
    }
    req.user = user
    next()
   }catch(err){ 
    res.send(err.message)
   }
}
module.exports={
    userauth,
}
