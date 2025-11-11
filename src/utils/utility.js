
const validator = require("validator");


const validatepostsignup = (req)=>{
const { FirstName, LastName, Age, EmailId, Password } = req.body;
    if(!FirstName || !LastName){
        throw new Error(" give first name and last name both");
    }
    else if(Age<18){
        throw new Error("age should be more than 18 ")
    }
    else if(!validator.isEmail(EmailId)){
        throw new Error("not a valid Email");
    }
    else if(!validator.isStrongPassword(Password)){
        throw new Error("give a strong password");
    }
}
const validateupdatingrequest=(req)=>{
    const allowedfields= ["FirstName","LastName","Skills","EmailId","Gender","Age","Skills"]
   const isallowed= Object.keys(req.body).every((field)=>{
        allowedfields.includes(field)
    })
    return isallowed;
    }

module.exports={
    validatepostsignup,
    validateupdatingrequest,
}