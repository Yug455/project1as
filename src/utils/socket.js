const socket = require("socket.io")
const crypto = require("crypto")
const Chat = require("../models/chat")
const getsecretroomId = (userId,touserId)=>{
    return crypto
    .createHash("sha256")
    .update([userId,touserId].sort().join(" "))
    .digest("hex")
}
const initializesocket= (server)=>{
const io= socket(server,{
    cors:{
        origin:"http://localhost:5173"
    },
})      
io.on("connection",(socket)=>{
 // handle events

 socket.on("joinchat",({FirstName, userId,targetuserId})=>{
    const room = getsecretroomId(userId,targetuserId)
    console.log(FirstName + "joining room" + room)
    socket.join(room)

 })
 socket.on("sendmessage",async({FirstName,userId,targetuserId,newMessage})=>{
    const room = getsecretroomId(userId,targetuserId)
    try{

         console.log(FirstName+ " "+newMessage)
        let chat = await Chat.findOne({
            participants : {$all :[userId,targetuserId]}
        })

        if(!chat){
            chat = new Chat({
                participants :[userId,targetuserId],
                messages: [],
            })
        }
        // chat ek document hai ab useme message ek document ha usme push karo chant document 
        chat.messages.push({
             senderID:userId,
            text:newMessage
        })
       await chat.save()
        io.to(room).emit("newmessagerecieved",{FirstName,newMessage})
    }catch(err){
        console.log(err.message)
    }
 })
 socket.on("disconnect",()=>{

 })
})
}

module.exports=initializesocket
