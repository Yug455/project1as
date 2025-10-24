const adminauth=(req,res,next)=>{
    const token ="xyz"
    if(req.headers.authorization== token){
        next();
    }
    else{
        res.status(401).send("invalid admin")
    }
}
const userauth=(req,res,next)=>{
    const token ="zxy"
    if(req.headers.authorization== token){
        console.log("checking user auth")
        next();
    }
    else{
        res.status(401).send("invalid admin")
    }
}
module.exports={
    adminauth,
    userauth,
}